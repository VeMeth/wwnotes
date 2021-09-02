import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Iwwevents } from './interfaces/wwevents.interface';
import { eventDto } from './events.dto';

const eventProjection = {
  __v: false,
  _id: false,
};

@Injectable()
export class WweventsService {
  constructor(
    @InjectModel('WweventsSchema')
    private readonly wweventsModel: Model<Iwwevents>,
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
    return event.save();
  }

  public async geteventById(id: number): Promise<eventDto> {
    const event = await this.wweventsModel
      .findOne({ id }, eventProjection)
      .exec();
    if (!event) {
      throw new HttpException('Not Found', 404);
    }
    return event;
  }
  public async deleteeventByID(id: number): Promise<any> {
    const event = await this.wweventsModel.deleteOne({ id }).exec();
    if (event.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return event;
  }
  public async puteventById(
    id: number,
    propertyName: string,
    propertyValue,
  ): Promise<any> {
    const event = await this.wweventsModel
      .findOneAndUpdate({ id }, { [propertyName]: propertyValue })
      .exec();
    if (!event) {
      throw new HttpException('Not Found', 404);
    }
    return event;
  }
}
