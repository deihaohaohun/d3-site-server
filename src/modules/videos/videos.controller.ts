import { Controller, Get } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private video: VideosService) {}

  @Get('')
  async readAllVideos() {
    return this.video.readAllVideos();
  }
}
