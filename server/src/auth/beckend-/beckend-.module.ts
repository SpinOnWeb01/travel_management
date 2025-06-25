import { Module } from '@nestjs/common';
import { BeckendService } from './beckend-.service';

@Module({
  providers: [BeckendService]
})
export class BeckendModule {}
