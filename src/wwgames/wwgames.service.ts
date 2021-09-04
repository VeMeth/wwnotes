import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { Iwwngames } from './interfaces/wwgames.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { map, lastValueFrom } from 'rxjs';

@Injectable()
export class WwgamesService {
  constructor(
    private httpService: HttpService,
    @InjectModel('wwgamesSchema')
    private readonly wwgamesModel: Model<Iwwngames>,
  ) {}

  public async createGame(WGameId: string) {
    console.log(WGameId);
    if (!WGameId) {
      throw new HttpException('Provide a GameId', 400);
    }
    console.log('Post request');
    const mingame = {
      GameId: WGameId,
      active: true,
    };
    const game = await new this.wwgamesModel(mingame);
    await game.save();
    const gameid = await game.id;
    const request = this.httpService
      .get(
        'https://archive.werewolv.es/extra/liveview/api/game/parsed/Day1/' +
          WGameId +
          '.json',
      )
      .pipe(map((response) => response.data));

    const response = await lastValueFrom(request);
    console.log('Response = ', response);
    response.game.identities.forEach(async (element) => {
      console.log('Adding Note for ', element);
      const postRequest = this.httpService
        .post('http://localhost:3000/wwnotes', {
          name: element,
          GameId: gameid,
        })
        .pipe(map((response) => response.data));
      const postResponse = await lastValueFrom(postRequest);
    });
  }
}
