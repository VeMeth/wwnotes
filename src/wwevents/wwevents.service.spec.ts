import { Test, TestingModule } from '@nestjs/testing';
import { WweventsService } from './wwevents.service';

describe('WweventService', () => {
  let service: WweventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WweventsService],
    }).compile();

    service = module.get<WweventsService>(WweventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
