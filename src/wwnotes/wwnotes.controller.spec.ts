import { Test, TestingModule } from '@nestjs/testing';
import { WwnotesController } from './wwnotes.controller';

describe('WwnotesController', () => {
  let controller: WwnotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WwnotesController],
    }).compile();

    controller = module.get<WwnotesController>(WwnotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
