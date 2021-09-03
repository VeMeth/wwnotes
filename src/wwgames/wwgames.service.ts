import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
@Injectable()
export class WwgamesService {
  constructor(private httpService: HttpService) {}

  public async createGame(GameId: string): Promise<any> {
    console.log('Post request');
    const result = await this.httpService
      .post('http://localhost:3000/wwnotes', {
        name: 'Boop',
      })
      .pipe(map((response) => response.data));
    console.log(result);
    return result;
  }
}
