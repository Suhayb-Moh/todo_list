import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ListModule } from './list/list.module';

@Module({
  providers: [],
  exports: [],
  imports: [
    CategoriesModule,
    UsersModule,
    TasksModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ListModule,
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}
}
