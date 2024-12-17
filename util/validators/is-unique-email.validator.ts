import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    return !user; // returns true if no user is found (email is unique)
  }

  defaultMessage(args: ValidationArguments): string {
    return `Email "${args.value}" is already in use.`;
  }
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions || {},
      constraints: [],
      validator: IsUniqueEmailValidator,
    });
  };
}
