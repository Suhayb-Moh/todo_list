import { IsString, IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  user_id: string;

  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  name: string;
}
