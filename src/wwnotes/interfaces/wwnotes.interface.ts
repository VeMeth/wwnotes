import { Document } from 'mongoose';

export interface Iwwnotes extends Document {
  readonly id: number;
  readonly role: string;
  readonly name: string;
}
