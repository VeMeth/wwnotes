import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WweventsController } from './wwevents.controller';
import { WweventsService } from './wwevents.service';
import { WweventsSchema } from './schemas/wwevents.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'WweventsSchema',
        schema: WweventsSchema,
      },
    ]),
  ],
  controllers: [WweventsController],
  providers: [WweventsService],
})
export class WweventsModule {}
