import { Schema, model, Document } from 'mongoose';

export interface IEvent {
  id: string;
  name: string;
  point?: number;
}

const eventSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  point: { type: Number, default: 0 }
});

export default model<IEvent & Document>('event', eventSchema);