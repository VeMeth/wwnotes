import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';

export class NoteDto {
  @ApiProperty({ description: 'Role of the Player (Seer, Protector)' })
  readonly role: string;
  @ApiProperty({ description: 'Ingame Name of the Player' })
  readonly name: string;
  @ApiProperty({
    required: false,
    description: 'Automatically populated by event creation',
  })
  readonly events: [{ type: Schema.Types.ObjectId; ref: 'WweventsSchema' }];
}
