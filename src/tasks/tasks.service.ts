import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private taskModel: Model<Task>, // Inject the model
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(createTaskDto);
    return task.save();
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
