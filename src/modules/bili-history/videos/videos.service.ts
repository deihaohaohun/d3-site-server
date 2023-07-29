import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Video, Prisma, VideoStatus } from '@prisma/client';
import * as dayjs from 'dayjs';

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

  async readVideosByDate(dateStr: string) {
    const start = dayjs(dateStr + ' 00:00:00');
    const end = dayjs(dateStr + ' 23:59:59');
    const counts = await this.prisma.history.groupBy({
      where: {
        when: {
          gt: start.toDate(),
          lt: end.toDate(),
        },
      },
      by: ['videoId'],
      _count: true,
    });
    const ids = counts.map((temp) => temp.videoId);
    const videos = await this.prisma.video.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return videos.map((v) => {
      const id = v.id;
      const count = counts.find((c) => c.videoId === id)._count;
      return { ...v, count };
    });
  }
}
