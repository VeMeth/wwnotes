import { Module } from '@nestjs/common';
import { WwnotesModule } from './wwnotes/wwnotes.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    WwnotesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/wwnotes'),
  ],
})
export class AppModule {}
