import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WweventsController } from './wwevents.controller';
import { WweventsService } from './wwevents.service';
import { WweventsSchema } from './schemas/wwevents.schema';
import { wwnotesSchema } from 'src/wwnotes/schemas/wwnotes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'WweventsSchema',
        schema: WweventsSchema,
      },
      {
        name: 'wwnotesSchema',
        schema: wwnotesSchema,
      },
    ]),
  ],
  controllers: [WweventsController],
  providers: [WweventsService],
})
export class WweventsModule {}
