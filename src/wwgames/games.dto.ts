import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';

export class gamesDto {
  @ApiProperty({ description: 'Game name (vmh-001)' })
  readonly GameName: string;
  @ApiProperty({ description: 'Is the game still active' })
  readonly active: boolean;
  /*@ApiProperty({
    required: false,
    description: 'Automatically populated by notes creation',
  })
  readonly notes: [{ type: Schema.Types.ObjectId; ref: 'WwnotesSchema' }];*/
}
