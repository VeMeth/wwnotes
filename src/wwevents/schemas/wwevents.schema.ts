import * as mongoose from 'mongoose';

export const WweventsSchema = new mongoose.Schema({
  _id: String,
  origin: String,
  target1: String,
  target2: String,
  type: String,
});
