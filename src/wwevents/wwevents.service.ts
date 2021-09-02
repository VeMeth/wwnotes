import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Iwwevents } from './interfaces/wwevents.interface';
import { eventDto } from './events.dto';
import { wwnotesSchema } from 'src/wwnotes/schemas/wwnotes.schema';
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
    const event = await new this.wweventsModel(newevent);
    event
      .save()
      .then((result) => {
        this.wwnoteModel.findOne({ _id: event.id }, (err, fnote) => {
          if (fnote) {
            fnote.events.push(event);
            fnote.save();
          }
        });
      })
      .catch((error) => {
        throw new HttpException(error, 404);
      });

    return event;
  }

  public async geteventById(_id: string): Promise<eventDto> {
    const event = await this.wweventsModel
      .findOne({ _id }, eventProjection)
      .exec();
    if (!event) {
      throw new HttpException('Not Found', 404);
    }
    return event;
  }
  public async deleteeventByID(_id: string): Promise<any> {
    const event = await this.wweventsModel.deleteOne({ _id }).exec();
    if (event.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return event;
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
