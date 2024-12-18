import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    const userId = req.user.userId;
    return this.tasksService.create({
      ...createTaskDto,
      user_id: userId,
    } as any);
  }

  @Get('list/:listId')
  findAllByListId(@Param('listId') listId: string) {
    return this.tasksService.findall(listId);
  }

  @Get('category/:categoryId')
  findAllByCategoryId(@Param('categoryId') categoryId: string) {
    return this.tasksService.findByCategoryId(categoryId);
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('description') description?: string,
    @Query('due_date') due_date?: string,
    @Query('priority') priority?: number,
    @Query('completed') completed?: boolean,
    @Query('category_id') category_id?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortBy') sortBy = 'due_date',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return this.tasksService.findAll(
      {
        name,
        description,
        due_date: due_date ? new Date(due_date) : undefined,
        priority,
        completed,
      },
      page,
      limit,
      sortBy,
      sortOrder,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
