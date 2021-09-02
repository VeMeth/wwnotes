import { Schema } from 'mongoose';

export const wwnotesSchema = new Schema({
  role: String,
  name: String,
  events: [{ type: Schema.Types.ObjectId, ref: 'WweventsSchema' }],
});
