import { Module } from '@nestjs/common';

import { CategoriesModule } from './categories/categories.module';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { ListsModule } from './lists/lists.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    CategoriesModule,
    TasksModule,
    ListsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
})
export class AppModule {}
