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
import { WweventsService } from './wwevents.service';
import { eventDto } from './events.dto';

@Controller('Wwevents')
export class WweventsController {
  constructor(private WweventService: WweventsService) {}

  @Get()
  public getevents() {
    return this.WweventService.getevents();
  }

  @Post()
  public postevent(@Body() event: eventDto) {
    return this.WweventService.postevent(event);
  }

  @Get(':id')
  public async geteventById(@Param('id') id: number) {
    return this.WweventService.geteventById(id);
  }

  @Delete(':id')
  public async deleteeventById(@Param('id') id: number) {
    this.WweventService.deleteeventByID(id);
  }
  @Put(':id')
  public async puteventById(@Param('id') id: number, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.WweventService.puteventById(id, propertyName, propertyValue);
  }
}
