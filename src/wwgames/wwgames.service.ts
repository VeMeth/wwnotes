import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { Iwwngames } from './interfaces/wwgames.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { map } from 'rxjs';
import { response } from 'express';

@Injectable()
export class WwgamesService {
  constructor(
    private httpService: HttpService,
    @InjectModel('wwgamesSchema')
    private readonly wwgamesModel: Model<Iwwngames>,
  ) {}

  public async createGame(GameId: string) {
    console.log('Create Game');
    const plist = await this.httpService
      .get(
        'https://archive.werewolv.es/extra/liveview/api/game/parsed/smc-400.json',
      )
      .pipe(map((response) => response.data.game.identities));
    plist.subscribe({
      next: (identities) => {
        identities.forEach((element) => {
          console.log('Adding Note for ', element);
          this.httpService
            .post('http://localhost:3000/wwnotes', {
              name: element,
              role: 'Unknown',
            })
            .pipe(map((response) => response.data));
        });
      },
    });
    return response;
  }
}
