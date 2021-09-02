import { Document } from 'mongoose';

export interface Iwwevents extends Document {
  readonly _id: string;
  readonly origin: string;
  readonly target1: string;
  readonly target2: string;
  readonly type: string;
}
