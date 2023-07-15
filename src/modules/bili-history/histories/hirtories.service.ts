import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HirtoriesService {
  constructor(private prisma: PrismaService) {}

  getAllHistories() {
    return this.prisma.history.findMany();
  }
}
