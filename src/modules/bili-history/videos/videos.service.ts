import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Video, Prisma, VideoStatus } from '@prisma/client';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async findUnique(ids: string[]): Promise<Video[]> {
    return this.prisma.video.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async createVideoHistory(videoId: string) {
    return this.prisma.video.update({
      where: { id: videoId },
      data: {
        current: {
          increment: 1,
        },
        historys: {
          create: {},
        },
      },
    });
  }

  async createVideo(video: Prisma.VideoCreateInput) {
    return this.prisma.video.create({
      data: video,
    });
  }

  async readAllVideos(status: VideoStatus = 'Doing'): Promise<Video[]> {
    return this.prisma.video.findMany({
      where: {
        status,
      },
    });
  }

  async startVideo(id: string) {
    return this.prisma.video.update({
      where: {
        id,
      },
      data: {
        status: 'Doing',
        current: 1,
      },
    });
  }

  async finishVideo(id: string) {
    return this.prisma.video.update({
      where: { id },
      data: {
        status: 'Done',
        historys: {
          create: {},
        },
      },
    });
  }
}
