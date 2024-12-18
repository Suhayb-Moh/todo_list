import { Schema, Document } from 'mongoose';

export const CategorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export interface Category extends Document {
  name: string;
}
