import { Module } from '@nestjs/common';
import { WwnotesModule } from './wwnotes/wwnotes.module';

@Module({
  imports: [WwnotesModule],
})
export class AppModule {}
