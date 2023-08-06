import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getAbhsDates } from 'src/utils/date';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  getAllHistories() {
    return this.prisma.note.findMany();
  }

  createNewNote(note: Prisma.NoteCreateInput) {
    const nextTime = getAbhsDates(new Date(), 1);
    note.nextTime = nextTime.toDate();
    return this.prisma.note.create({ data: note });
  }
}
