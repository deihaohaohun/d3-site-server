import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Video, Prisma } from '@prisma/client';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

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

  async readAllVideos(): Promise<Video[]> {
    return this.prisma.video.findMany();
  }
}
