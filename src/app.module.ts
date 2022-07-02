import { Module } from '@nestjs/common';
import { WweventsModule } from './wwevents/wwevents.module';
import { WwnotesModule } from './wwnotes/wwnotes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WwgamesModule } from './wwgames/wwgames.module';
import { HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

let connstring: string;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
if (process.env.MONGO_USER.length < 1) {
  console.log('No Mongo Username found');
  connstring =
    'mongodb://' +
    process.env.MONGO_HOST +
    ':' +
    process.env.MONGO_PORT +
    '/wwnotes';
} else {
  connstring =
    'mongodb://' +
    process.env.MONGO_USER +
    ':' +
    process.env.MONGO_PASSWORD +
    '@' +
    process.env.MONGO_HOST +
    ':' +
    process.env.MONGO_PORT +
    '/wwnotes';
}
console.log('ConnectionString:' + connstring);
@Module({
  imports: [
    ConfigModule.forRoot(),
    WweventsModule,
    WwnotesModule,
    MongooseModule.forRoot(connstring),
    WwgamesModule,
  ],
})
export class AppModule {}
console.log('Mongohost: ' + process.env.MONGO_HOST);
