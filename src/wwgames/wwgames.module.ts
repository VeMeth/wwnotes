import { Module } from '@nestjs/common';
import { WwgamesController } from './wwgames.controller';
import { WwgamesService } from './wwgames.service';
import { HttpModule } from '@nestjs/axios';
import { wwgamesSchema } from './schemas/wwgames.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'wwgamesSchema',
        schema: wwgamesSchema,
      },
    ]),
    HttpModule,
  ],
  controllers: [WwgamesController],
  providers: [WwgamesService],
})
export class WwgamesModule {}
