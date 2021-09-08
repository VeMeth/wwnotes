import { Injectable, HttpException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Iwwevents } from './interfaces/wwevents.interface';
import { eventDto } from './events.dto';
/*import { wwnotesSchema } from 'src/wwnotes/schemas/wwnotes.schema';*/
import { Iwwnotes } from 'src/wwnotes/interfaces/wwnotes.interface';
const eventProjection = {
  __v: false,
};

@Injectable()
export class WweventsService {
  constructor(
    @InjectModel('WweventsSchema')
    private readonly wweventsModel: Model<Iwwevents>,
    @InjectModel('wwnotesSchema')
    private readonly wwnoteModel: Model<Iwwnotes>,
  ) {}

  public async getevents(): Promise<eventDto[]> {
    const events = await this.wweventsModel.find({}, eventProjection).exec();
    if (!events || !events[0]) {
      throw new HttpException('Not Found', 404);
    }
    return events;
  }

  public async postevent(newevent: eventDto): Promise<eventDto> {
    console.log('newevent = ', newevent);
    if (isValidObjectId(newevent.NoteId)) {
      const exists = await this.wwnoteModel.findOne({ _id: newevent.NoteId });
      if (!exists) {
        return Promise.reject(new HttpException(newevent.NoteId, 412));
      }

      const event = await new this.wweventsModel(newevent);
      await event.save();

      await this.wwnoteModel.findOne({ _id: event.NoteId }, (err, fnote) => {
        if (fnote) {
          fnote.events.push(event);
          fnote.save();
        }
      });
      return event;
    } else {
      return Promise.reject(new HttpException('Invalid ObjectID', 400));
    }
  }

  public async geteventById(_id: string): Promise<eventDto> {
    if (isValidObjectId(_id)) {
      const event = await this.wweventsModel
        .findById({ _id }, eventProjection)
        .exec();
      if (!event) {
        return Promise.reject(new HttpException('NoteID not found', 412));
      }
      return event;
    } else {
      return Promise.reject(new HttpException('Invalid ObjectID', 400));
    }
  }
  public async deleteeventByID(_id: string): Promise<any> {
    if (isValidObjectId(_id)) {
      const oevent = await (await this.wweventsModel.findById({ _id })).NoteId;
      await this.wwnoteModel.findByIdAndUpdate(oevent, {
        $pull: { events: _id },
      });
      const event = await this.wweventsModel.findByIdAndDelete({ _id }).exec();
      return event;
    } else {
      return Promise.reject(new HttpException('Invalid ObjectID', 400));
    }
  }
  public async puteventById(
    _id: string,
    propertyName: string,
    propertyValue,
  ): Promise<any> {
    const event = await this.wweventsModel
      .findOneAndUpdate({ _id }, { [propertyName]: propertyValue })
      .exec();
    if (!event) {
      throw new HttpException('Not Found', 404);
    }
    return event;
  }
}
