import { Schema } from 'mongoose';

export const wwnotesSchema = new Schema({
  role: String,
  name: String,
  GameId: String,
  events: [{ type: Schema.Types.ObjectId, ref: 'WweventsSchema' }],
});
