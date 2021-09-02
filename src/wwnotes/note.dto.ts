import { Schema } from 'mongoose';

export class NoteDto {
  readonly _id: string;
  readonly role: string;
  readonly name: string;
  readonly events: [{ type: Schema.Types.ObjectId; ref: 'WweventsSchema' }];
}
