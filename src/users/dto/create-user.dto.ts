import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Username is required',
  })
  @IsString()
  @MaxLength(50)
  username: string;

  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsString()
  @IsEmail(
    {},
    {
      message: 'Invalid email format',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @MaxLength(20)
  password: string;
}
