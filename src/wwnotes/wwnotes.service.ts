import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Iwwnotes } from './interfaces/wwnotes.interface';
import { NoteDto } from './note.dto';

const noteProjection = {
  __v: false,
};

@Injectable()
export class WwnotesService {
  constructor(
    @InjectModel('wwnotesSchema') private readonly wwnoteModel: Model<Iwwnotes>,
  ) {}

  public async getNotes(): Promise<NoteDto[]> {
    const notes = await this.wwnoteModel.find({}, noteProjection).exec();
    if (!notes || !notes[0]) {
      throw new HttpException('Not Found', 404);
    }
    return notes;
  }

  public async postNote(newnote: NoteDto): Promise<NoteDto> {
    const note = await new this.wwnoteModel(newnote);
    return note.save();
  }

  public async getNoteById(id: number): Promise<NoteDto> {
    const note = await this.wwnoteModel.findOne({ id }, noteProjection).exec();
    if (!note) {
      throw new HttpException('Not Found', 404);
    }
    return note;
  }
  public async deleteNoteByID(id: number): Promise<any> {
    const note = await this.wwnoteModel.deleteOne({ id }).exec();
    if (note.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return note;
  }
  public async putNoteById(
    id: number,
    propertyName: string,
    propertyValue,
  ): Promise<any> {
    const note = await this.wwnoteModel
      .findOneAndUpdate({ id }, { [propertyName]: propertyValue })
      .exec();
    if (!note) {
      throw new HttpException('Not Found', 404);
    }
    return note;
  }
}
