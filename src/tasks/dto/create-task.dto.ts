import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDate,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty({
    message: 'List ID is required',
  })
  @IsNumber()
  list_id: number;

  @IsOptional()
  @IsNumber()
  category_id: number;

  @IsNotEmpty({
    message: 'Task name is required',
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  due_date: Date;

  @IsOptional()
  @IsNumber()
  priority: number;

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
