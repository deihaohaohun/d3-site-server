import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Prisma } from '@prisma/client';

@Controller('videos')
export class VideosController {
  constructor(private video: VideosService) {}

  @Get()
  async getUnique(@Query('ids') ids) {
    return this.video.findUnique(ids);
  }

  @Get(':status')
  async readAllVideos(@Param('status') status) {
    return this.video.readAllVideos(status);
  }

  @Post('')
  async addVideo(@Body() video: Prisma.VideoCreateInput) {
    const createdVideo = await this.video.createVideo(video);
    return createdVideo;
  }

  @Put(':videoId')
  async addVideoHistory(@Param('videoId') videoId: string) {
    await this.video.createVideoHistory(videoId);
  }

  @Put('start/:videoId')
  async startVideo(@Param('videoId') videoId: string) {
    await this.video.startVideo(videoId);
  }

  @Put('finish/:videoId')
  async finishVideo(@Param('videoId') videoId: string) {
    await this.video.finishVideo(videoId);
  }
}
