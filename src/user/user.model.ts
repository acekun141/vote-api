import mongoose from 'mongoose';
import { User } from './user.interface';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export default mongoose.model<User & mongoose.Document>('User', userSchema);