import { Module } from '@nestjs/common';
import { WweventsModule } from './wwevents/wwevents.module';
import { WwnotesModule } from './wwnotes/wwnotes.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    WweventsModule,
    WwnotesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/wwnotes'),
  ],
})
export class AppModule {}
