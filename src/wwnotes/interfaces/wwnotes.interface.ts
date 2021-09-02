import { Document, Schema } from 'mongoose';

export interface Iwwnotes extends Document {
  readonly id: number;
  readonly role: string;
  readonly name: string;
  readonly events: [
    {
      type: Schema.Types.ObjectId;
      ref: 'WweventsSchema';
    },
  ];
}
