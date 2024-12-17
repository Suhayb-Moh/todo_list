import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import { IsUniqueEmailValidator } from 'util/validators/is-unique-email.validator';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, IsUniqueEmailValidator],
})
export class UsersModule {}
