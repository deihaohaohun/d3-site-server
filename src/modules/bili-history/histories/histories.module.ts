import { Module } from '@nestjs/common';
import { HistoriesController } from './histories.controller';
import { HirtoriesService } from './hirtories.service';

@Module({
  controllers: [HistoriesController],
  providers: [HirtoriesService],
})
export class HistoriesModule {}
