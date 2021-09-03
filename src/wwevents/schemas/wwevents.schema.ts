import * as mongoose from 'mongoose';

export const WweventsSchema = new mongoose.Schema({
  NoteId: {
    type: String,
    required: [
      function () {
        return this._id != null;
      },
      'NoteID is required for events',
    ],
  },
  target1: String,
  target2: String,
  type: String,
  result: String,
  phase: Number,
});
