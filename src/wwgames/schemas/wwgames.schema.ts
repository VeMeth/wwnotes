import { Schema } from 'mongoose';

export const wwgamesSchema = new Schema({
  GameId: String,
  active: Boolean,
  notes: [{ type: Schema.Types.ObjectId, ref: 'WwnotesSchema' }],
});
