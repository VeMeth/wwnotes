import { Module } from '@nestjs/common';
import { WwgamesController } from './wwgames.controller';
import { WwgamesService } from './wwgames.service';

@Module({
  controllers: [WwgamesController],
  providers: [WwgamesService]
})
export class WwgamesModule {}
