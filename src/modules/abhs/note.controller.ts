import { Body, Controller, Get, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { Prisma } from '@prisma/client';

@Controller('note')
export class NoteController {
  constructor(private note: NoteService) {}

  @Get()
  async readAllHistories() {
    return this.note.getAllHistories();
  }

  @Post()
  async createNewNote(@Body() note: Prisma.NoteCreateInput) {
    return this.note.createNewNote(note);
  }
}
