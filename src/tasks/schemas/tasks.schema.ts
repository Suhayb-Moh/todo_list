import { Schema, Document, Types } from 'mongoose';
import { List } from 'src/list/schemas/list.schema';
import { Category } from 'src/categories/schemas/categories.schema';

export const TaskSchema = new Schema<Task>(
  {
    list_id: {
      type: Schema.Types.ObjectId,
      ref: 'List', // Reference to the List model
      required: true, // Ensures each task is associated with a list
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category', // Reference to the List model
      required: true, // Ensures each task is associated with a list
    },
    name: { type: String, required: true },
    description: { type: String, required: false },
    due_date: { type: Date, required: false },
    priority: { type: Number, required: false },
    completed: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export interface Task extends Document {
  list_id: Types.ObjectId;
  category_id: Types.ObjectId;
  name: string;
  description?: string;
  due_date?: Date;
  priority?: number;
  completed: boolean;
}
