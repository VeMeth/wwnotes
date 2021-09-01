import { Test, TestingModule } from '@nestjs/testing';
import { WwnotesService } from './wwnotes.service';

describe('WwnotesService', () => {
  let service: WwnotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WwnotesService],
    }).compile();

    service = module.get<WwnotesService>(WwnotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
