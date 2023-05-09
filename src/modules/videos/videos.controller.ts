import { Body, Controller, Get, Post } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Prisma } from '@prisma/client';

@Controller('videos')
export class VideosController {
  constructor(private video: VideosService) {}

  @Get('')
  async readAllVideos() {
    return this.video.readAllVideos();
  }

  @Post('')
  async addVideo(@Body() video: Prisma.VideoCreateInput) {
    let createdVideo = await this.video.createVideo(video);
    return createdVideo;
  }
}
