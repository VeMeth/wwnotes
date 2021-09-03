import { ApiProperty } from '@nestjs/swagger';

export class eventDto {
  @ApiProperty({ description: 'Object ID of the player note it reffers to' })
  readonly NoteId: string;
  @ApiProperty({
    description:
      'Phase of the event day1-6x, one day is day plus the following night',
  })
  readonly phase: number;
  @ApiProperty({
    description: 'First target of the event, usually the target being visited',
  })
  readonly target1: string;
  @ApiProperty({
    description: 'second target of the event, usually the target being visited',
  })
  readonly target2: string;
  @ApiProperty({
    description: 'Type of the event (SeerCheck, ProtectorVisit etc.',
  })
  readonly type: string;
  @ApiProperty({
    description: 'Result of the event, can be a seer check result for exmaple',
  })
  readonly result: string;
}
