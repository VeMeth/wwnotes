import { Document, Schema } from 'mongoose';

export interface Iwwnotes extends Document {
  readonly _id: string;
  readonly role: string;
  readonly name: string;
  readonly GameId: string;
  readonly events: [
    {
      type: Schema.Types.ObjectId;
      ref: 'WweventsSchema';
    },
  ];
}
