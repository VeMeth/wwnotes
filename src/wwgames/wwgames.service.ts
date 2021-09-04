import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { Model } from 'mongoose';
import { Iwwngames } from './interfaces/wwgames.interfaces';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WwgamesService {
  constructor(
    private httpService: HttpService,
    @InjectModel('wwgamesSchema')
    private readonly wwgamesModel: Model<Iwwngames>,
  ) {}

  public async createGame(GameId: string): Promise<any> {
    console.log('Post request');
    return await this.httpService
      .get(
        'https://archive.werewolv.es/extra/liveview/api/game/parsed/smc-400.json',
      )
      .pipe(map((response) => response.data));

    /*const result = await this.httpService
      .post('http://localhost:3000/wwnotes', {
        name: 'Boop',
      })
      .pipe(map((response) => response.data));
    console.log(result); */
    //return plist;
  }
}
