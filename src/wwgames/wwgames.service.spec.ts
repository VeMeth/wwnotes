import { Test, TestingModule } from '@nestjs/testing';
import { WwgamesService } from './wwgames.service';

describe('WwgamesService', () => {
  let service: WwgamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WwgamesService],
    }).compile();

    service = module.get<WwgamesService>(WwgamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
