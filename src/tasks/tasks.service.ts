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

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
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
