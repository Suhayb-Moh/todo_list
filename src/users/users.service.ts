import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // find a user by email
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel({
      ...createUserDto,
    });
    return newUser.save();
  }

  // Validate password during login
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOneByEmail(email);
    console.log('found user:', user);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    return updatedUser;
  }

  async remove(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
