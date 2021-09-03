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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('Wwevents')
export class WweventsController {
  constructor(private WweventService: WweventsService) {}

  @Get()
  @ApiOkResponse({ description: 'Events Listed' })
  @ApiNotFoundResponse({ description: 'No Events found' })
  public getevents() {
    return this.WweventService.getevents();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Event created' })
  @ApiBadRequestResponse({ description: 'Bad request due to missing fields' })
  public postevent(@Body() event: eventDto) {
    return this.WweventService.postevent(event);
  }

  @Get(':_id')
  @ApiOkResponse({ description: 'Event found' })
  @ApiNotFoundResponse({ description: 'Event with provided ID not found' })
  @ApiBadRequestResponse({ description: 'Invalid ObjectId' })
  public async geteventById(@Param('_id') _id: string) {
    return this.WweventService.geteventById(_id);
  }
  @ApiOkResponse({ description: 'Event deleted' })
  @ApiNotFoundResponse({ description: 'Event with provided ID not deleted' })
  @ApiBadRequestResponse({ description: 'Invalid ObjectId' })
  @Delete(':_id')
  public async deleteeventById(@Param('_id') _id: string) {
    return this.WweventService.deleteeventByID(_id);
  }
  @Put(':_id')
  @ApiOkResponse({ description: 'Event modified' })
  @ApiNotFoundResponse({ description: 'Event with provided ID not modified' })
  public async puteventById(@Param('_id') _id: string, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.WweventService.puteventById(_id, propertyName, propertyValue);
  }
}
