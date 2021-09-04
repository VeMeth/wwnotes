import { Injectable } from '@nestjs/common';
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

  public async createGame(GameId: string) {
    console.log('Post request');
    const request = this.httpService
      .get(
        'https://archive.werewolv.es/extra/liveview/api/game/parsed/smc-400.json',
      )
      .pipe(map((response) => response.data));

    const response = await lastValueFrom(request);
    console.log('Response = ', response);
    response.game.identities.forEach(async (element) => {
      console.log('Adding Note for ', element);
      const postRequest = this.httpService
        .post('http://localhost:3000/wwnotes', { name: element })
        .pipe(map((response) => response.data));
      const postResponse = await lastValueFrom(postRequest);
    });
  }
}
