import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getAbhsDates } from 'src/utils/date';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  retrieveAllNotes() {
    return this.prisma.note.findMany({
      where: {
        current: {
          not: 10,
        },
      },
    });
  }

  getNote(id: string) {
    return this.prisma.note.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });
  }

  async createNewNote(note: Prisma.NoteCreateInput) {
    const nextTime = getAbhsDates(new Date(), 1);
    note.nextTime = nextTime.toDate();
    return this.prisma.note.create({ data: note });
  }

  async rememberNote(id) {
    const note = await this.prisma.note.findUnique({ where: { id } });
    const nextTime = getAbhsDates(note.nextTime, note.current++).toDate();
    return this.prisma.note.update({
      data: { nextTime, current: note.current },
      where: { id },
    });
  }

  async forgetNote(id) {
    const nextTime = getAbhsDates(new Date(), 0).toDate();
    return this.prisma.note.update({
      data: { nextTime, current: 1 },
      where: { id },
    });
  }
}
