import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './schemas/list.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'List', schema: ListSchema }])],
  exports: [ListService],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
