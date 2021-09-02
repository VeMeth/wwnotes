import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WwnotesController } from './wwnotes.controller';
import { WwnotesService } from './wwnotes.service';
import { wwnotesSchema } from './schemas/wwnotes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'wwnotesSchema',
        schema: wwnotesSchema,
      },
    ]),
  ],
  controllers: [WwnotesController],
  providers: [WwnotesService],
})
export class WwnotesModule {}
