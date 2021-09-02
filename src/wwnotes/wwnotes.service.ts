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

  public async getNoteById(_id: string): Promise<NoteDto> {
    console.log(_id);
    const note = await this.wwnoteModel.findById(_id).exec();
    /*if (!note) {
      throw new HttpException('Not Found', 404);
    }*/
    return note;
  }
  public async deleteNoteByID(_id: string): Promise<any> {
    const note = await this.wwnoteModel.findByIdAndDelete({ _id }).exec();
    /*if (note.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }*/
    return note;
  }
  public async putNoteById(
    _id: string,
    propertyName: string,
    propertyValue,
  ): Promise<any> {
    const note = await this.wwnoteModel
      .findByIdAndUpdate({ _id }, { [propertyName]: propertyValue })
      .exec();
    if (!note) {
      throw new HttpException('Not Found', 404);
    }
    return note;
  }
}
