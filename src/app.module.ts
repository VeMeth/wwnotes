import { Module } from '@nestjs/common';
import { WweventsModule } from './wwevents/wwevents.module';
import { WwnotesModule } from './wwnotes/wwnotes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WwgamesModule } from './wwgames/wwgames.module';
import { HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

console.log(process.env.MONGO_HOST);
@Module({
  imports: [
    ConfigModule.forRoot(),
    WweventsModule,
    WwnotesModule,
    MongooseModule.forRoot(
      'mongodb://' +
        process.env.MONGO_USER +
        ':' +
        process.env.MONGO_PASSWORD +
        '@' +
        process.env.MONGO_HOST +
        ':' +
        process.env.MONGO_PORT +
        '/wwnotes',
    ),
    WwgamesModule,
  ],
})
export class AppModule {}
console.log(process.env.MONGO_HOST);
