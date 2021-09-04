import { Document, Schema } from 'mongoose';

export interface Iwwngames extends Document {
  readonly GameId: string;
  readonly active: boolean;
  readonly notes: [
    {
      type: Schema.Types.ObjectId;
      ref: 'WwnotesSchema';
    },
  ];
}
