import { Schema } from 'mongoose';

export const wwnotesSchema = new Schema({
  _id: String,
  role: String,
  name: String,
  events: [{ type: Schema.Types.ObjectId, ref: 'WweventsSchema' }],
});
