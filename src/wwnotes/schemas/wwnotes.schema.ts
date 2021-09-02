import * as mongoose from 'mongoose';

export const wwnotesSchema = new mongoose.Schema({
  id: Number,
  role: String,
  name: String,
});
