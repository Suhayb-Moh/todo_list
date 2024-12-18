import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListService } from 'src/list/list.service';
@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private taskModel: Model<Task>, // Inject the model
    private readonly ListService: ListService,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const listExists = await this.ListService.findOne(createTaskDto.list_id);
    if (!listExists) {
      throw new Error('Invalid list ID');
    }
    const task = new this.taskModel({
      ...createTaskDto,
    });
    return task.save();
  }

  // Get all tasks and populate list data
  async findall(listId: string): Promise<Task[]> {
    return this.taskModel
      .find({
        list_id: listId,
      })
      .populate('list_id', 'name')
      .exec();
  }

  // find tasks by category id
  async findByCategoryId(categoryId: string): Promise<Task[]> {
    return this.taskModel
      .find({
        category_id: categoryId,
      })
      .populate('category_id', 'name')
      .exec();
  }

  // async findAll(): Promise<Task[]> {
  //   return this.taskModel.find().exec();
  // }

  async findAll(
    filters: {
      name?: string;
      description?: string;
      due_date?: Date;
      priority?: number;
      completed?: boolean;
      category_id?: string;
    } = {},
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'due_date',
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<{ tasks: Task[]; total: number; page: number; limit: number }> {
    const query: any = {};

    // Add search and filter conditions to the query object
    if (filters.name) {
      query.name = new RegExp(filters.name, 'i');
    }
    if (filters.description) {
      query.description = new RegExp(filters.description, 'i');
    }
    if (filters.due_date) {
      query.due_date = { $gte: filters.due_date };
    }
    if (filters.priority) {
      query.priority = filters.priority;
    }
    if (filters.completed) {
      query.completed = filters.completed;
    }
    if (filters.category_id) {
      query.category_id = filters.category_id;
    }
    if (typeof filters.completed !== 'undefined')
      query.compare = filters.completed;

    const skip = (page - 1) * limit; // Calculate the number of ducoments to skip

    // Construct valid sort object
    const allowedSortFields = ['due_date', 'priority', 'name'];
    if (!allowedSortFields.includes(sortBy)) {
      throw new Error('Invalid sort field');
    }
    const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrderValue };

    try {
      // Fetch tasks with pagination and sorting
      const tasks = await this.taskModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec();
      const total = await this.taskModel.countDocuments(query).exec(); // Total number of tasks matching the query
      return { tasks, total, page, limit };
    } catch (error) {
      throw new Error('Error fetching tasks:' + error.message);
    }
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async update(
    id: string,
    updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
