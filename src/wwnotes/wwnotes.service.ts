import { Injectable, HttpException } from '@nestjs/common';

import { NOTES } from './wwnotes.mock';
@Injectable()
export class WwnotesService {
  private notes = NOTES;
  public getNotes() {
    return this.notes;
  }
  public postNote(note) {
    return this.notes.push(note);
  }
  public getNoteById(id: number): Promise<any> {
    const noteId = Number(id);
    return new Promise((resolve) => {
      const note = this.notes.find((note) => note.id === noteId);
      if (!note) {
        throw new HttpException('Not Found', 404);
      }
      return resolve(note);
    });
  }
  public deleteNoteByID(id: number): Promise<any> {
    const noteId = Number(id);
    return new Promise((resolve) => {
      const index = this.notes.findIndex((note) => note.id === noteId);
      if (index === -1) {
        throw new HttpException('Not Found', 404);
      }
      this.notes.splice(index, 1);
      return resolve(this.notes);
    });
  }
  public putNoteById(
    id: number,
    propertyName: string,
    propertyValue,
  ): Promise<any> {
    const noteId = Number(id);
    return new Promise((resolve) => {
      const index = this.notes.findIndex((note) => note.id === noteId);
      if (index === -1) {
        throw new HttpException('Not Found', 404);
      }
      this.notes[index][propertyName] = propertyValue;
      return resolve(this.notes[index]);
    });
  }
}
