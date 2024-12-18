import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'Task name is required',
  })
  @IsString()
  @MaxLength(100)
  name: string;
}
