import mongoose from 'mongoose';
import { Token } from './token.interface';

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  username: { type: String, required: true },
  createAt: { type: Date, expires: 3600*24*7, default: Date.now}  
});

export default mongoose.model<Token & mongoose.Document>('Token', tokenSchema);