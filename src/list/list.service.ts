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

  async findAll(): Promise<List[]> {
    return this.listModel.find().exec();
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
