import { Module } from '@nestjs/common';
import { WwnotesController } from './wwnotes.controller';
import { WwnotesService } from './wwnotes.service';

@Module({
  controllers: [WwnotesController],
  providers: [WwnotesService],
})
export class WwnotesModule {}
