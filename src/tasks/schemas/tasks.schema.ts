import { Schema, Document } from 'mongoose';

export const TaskSchema = new Schema<Task>({
  list_id: {
    type: Number,
    required: true,
  },
  category_id: { type: Number, required: false },
  name: { type: String, required: true },
  description: { type: String, required: false },
  due_date: { type: Date, required: false },
  priority: { type: Number, required: false },
  completed: { type: Boolean, required: true, default: false },
});

export interface Task extends Document {
  list_id: number;
  category_id: number;
  name: string;
  description?: string;
  due_date?: Date;
  priority?: number;
  completed: boolean;
}
