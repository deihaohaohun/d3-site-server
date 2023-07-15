import { Controller, Get } from '@nestjs/common';
import { HirtoriesService } from './hirtories.service';

@Controller('histories')
export class HistoriesController {
  constructor(private history: HirtoriesService) {}

  @Get()
  async readAllVideos() {
    return this.history.getAllHistories();
  }
}
