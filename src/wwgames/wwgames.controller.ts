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
  @Get(':WGameId')
  @ApiOkResponse({ description: 'Game created' })
  @ApiBadRequestResponse({ description: 'Invalid or missingGame ID' })
  public async createGame(@Param('WGameId') WGameId: string) {
    return this.WwgamesService.createGame(WGameId);
  }
}
