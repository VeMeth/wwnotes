import { Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { WwgamesService } from './wwgames.service';
@Controller('wwgames')
export class WwgamesController {
  constructor(private WwgamesService: WwgamesService) {}
  @Get('game')
  @ApiOkResponse({ description: 'Game created' })
  @ApiNotFoundResponse({ description: 'Event with provided ID not found' })
  @ApiBadRequestResponse({ description: 'Invalid Game ID' })
  public async createGame(GameId) {
    return this.WwgamesService.createGame(GameId);
  }
}