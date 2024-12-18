import { Schema, Document } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export const ListSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export interface List extends Document {
  id: string;
  user_id: string;
  name: string;
}
