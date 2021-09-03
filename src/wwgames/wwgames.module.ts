import { Module } from '@nestjs/common';
import { WwgamesController } from './wwgames.controller';
import { WwgamesService } from './wwgames.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WwgamesController],
  providers: [WwgamesService],
})
export class WwgamesModule {}
