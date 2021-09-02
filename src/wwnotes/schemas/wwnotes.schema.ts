import { Schema } from 'mongoose';

export const wwnotesSchema = new Schema({
  id: Number,
  role: String,
  name: String,
  events: [{ type: Schema.Types.ObjectId, ref: 'WweventsSchema' }],
});
