import { Document } from 'mongoose';

export interface Iwwevents extends Document {
  readonly NoteId: string;
  readonly phase: number;
  readonly target1: string;
  readonly target2: string;
  readonly type: string;
  readonly result: string;
}
