import { Document } from 'mongoose';

export interface Iwwevents extends Document {
  readonly id: number;
  readonly origin: string;
  readonly target1: string;
  readonly target2: string;
  readonly type: string;
}
