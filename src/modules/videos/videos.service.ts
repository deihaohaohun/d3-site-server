import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Video, Prisma } from '@prisma/client';

@Injectable()
export class VideosService {
  async createVideo(video: Prisma.VideoCreateInput) {
    return this.prisma.video.create({
      data: video,
    });
  }
  constructor(private prisma: PrismaService) {}

  async readAllVideos(): Promise<Video[]> {
    return this.prisma.video.findMany();
  }
}
