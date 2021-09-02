import { Test, TestingModule } from '@nestjs/testing';
import { WweventsController } from './wwevents.controller';

describe('WweventsController', () => {
  let controller: WweventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WweventsController],
    }).compile();

    controller = module.get<WweventsController>(WweventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
