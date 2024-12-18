import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/tasks.schema';
import { ListModule } from 'src/list/list.module';

@Module({
  imports: [
    ListModule,
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
  ],
  exports: [TasksService],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
