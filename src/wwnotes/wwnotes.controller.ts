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

  @Get(':_id')
  public async getNoteById(@Param('_id') _id: string) {
    return this.WwnotesService.getNoteById(_id);
  }

  @Get()
  public getNotes() {
    return this.WwnotesService.getNotes();
  }

  @Post()
  public postNote(@Body() note: NoteDto) {
    return this.WwnotesService.postNote(note);
  }

  @Delete(':_id')
  public async deleteNoteById(@Param('_id') _id: string) {
    return this.WwnotesService.deleteNoteByID(_id);
  }
  @Put(':_id')
  public async putNoteById(@Param('_id') _id: string, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.WwnotesService.putNoteById(_id, propertyName, propertyValue);
  }
}
