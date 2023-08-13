import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NoteService } from './note.service';
import { Prisma } from '@prisma/client';

@Controller('note')
export class NoteController {
  constructor(private note: NoteService) {}

  @Get()
  async retrieveAllNotes() {
    return this.note.retrieveAllNotes();
  }

  @Get(':id')
  async getNote(@Param('id') id: string) {
    return this.note.getNote(id);
  }

  @Post()
  async createNewNote(@Body() note: Prisma.NoteCreateInput) {
    return this.note.createNewNote(note);
  }

  @Put('remember/:id')
  async rememberNote(@Param('id') id: string) {
    return this.note.rememberNote(id);
  }

  @Put('forget/:id')
  async forgetNote(@Param('id') id: string) {
    return this.note.forgetNote(id);
  }
}
