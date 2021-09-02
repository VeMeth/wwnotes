/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { WwnotesService } from './wwnotes.service';
import { NoteDto } from './note.dto';

@Controller('wwnotes')
export class WwnotesController {
  constructor(private WwnotesService: WwnotesService) {}

  @Get()
  public getNotes() {
    return this.WwnotesService.getNotes();
  }

  @Post()
  public postNote(@Body() note: NoteDto) {
    return this.WwnotesService.postNote(note);
  }

  @Get(':id')
  public async getNoteById(@Param('id') id: number) {
    return this.WwnotesService.getNoteById(id);
  }

  @Delete(':id')
  public async deleteNoteById(@Param('id') id: number) {
    this.WwnotesService.deleteNoteByID(id);
  }
  @Put(':id')
  public async putNoteById(@Param('id') id: number, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.WwnotesService.putNoteById(id, propertyName, propertyValue);
  }
}
