import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';

export class gamesDto {
  @ApiProperty({ description: 'Game name (vmh-001)' })
  readonly GameId: string;
  @ApiProperty({ description: 'Ingame Name of the Player' })
  readonly active: boolean;
  @ApiProperty({
    required: false,
    description: 'Automatically populated by notes creation',
  })
  readonly notes: [{ type: Schema.Types.ObjectId; ref: 'WwnotesSchema' }];
}
