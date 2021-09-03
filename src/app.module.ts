import { Module } from '@nestjs/common';
import { WweventsModule } from './wwevents/wwevents.module';
import { WwnotesModule } from './wwnotes/wwnotes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WwgamesModule } from './wwgames/wwgames.module';
import { HttpService } from '@nestjs/axios';
@Module({
  imports: [
    WweventsModule,
    WwnotesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/wwnotes'),
    WwgamesModule,
  ],
})
export class AppModule {}
