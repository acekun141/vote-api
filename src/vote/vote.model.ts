import { string } from 'joi';
import { Schema, Document, model } from 'mongoose';

export interface IVote {
  id: string;
  userId: string;
  eventId: string;
  time: Date
}

const voteSchema = new Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  eventId: { type: String, required: true },
  time: { type: Date, default: Date.now }
});

export default model<IVote & Document>('vote', voteSchema); 