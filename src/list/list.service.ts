import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Model } from 'mongoose';
import { List } from './schemas/list.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ListService {
  constructor(@InjectModel('List') private readonly listModel: Model<List>) {}
  async create(createListDto: CreateListDto): Promise<List> {
    const list = new this.listModel(createListDto);
    return list.save();
  }

  async findAll(
    filters: { user_id?: string; name?: string } = {},
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'name',
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<{ lists: List[]; total: number; page: number; limit: number }> {
    const query: any = {};

    // Add search and filter conditions to the query object
    if (filters.user_id) {
      query.user_id = filters.user_id;
    }
    if (filters.name) {
      query.name = new RegExp(filters.name, 'i');
    }

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Construct valid sort object
    const allowedSortFields = ['name'];
    if (!allowedSortFields.includes(sortBy)) {
      throw new Error('Invalid sort field');
    }
    const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrderValue };

    try {
      const lists = await this.listModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
      const total = await this.listModel.countDocuments(query).exec();
      return { lists, total, page, limit };
    } catch (error) {
      throw new Error('Error fetching lists:' + error.message);
    }
  }

  // Find lists by a specific user ID
  async findByUserId(userId: string): Promise<List[]> {
    return this.listModel
      .find({ user_id: userId })
      .populate('user_id', 'username email')
      .exec();
  }

  async findOne(id: string): Promise<List | null> {
    return this.listModel.findById(id).exec();
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<List | null> {
    const updatedList = await this.listModel.findByIdAndUpdate(
      id,
      updateListDto,
      { new: true },
    );
    return updatedList;
  }

  remove(id: string): Promise<any> {
    return this.listModel.findByIdAndDelete(id).exec();
  }
}
