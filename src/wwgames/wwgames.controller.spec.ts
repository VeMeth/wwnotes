import { Test, TestingModule } from '@nestjs/testing';
import { WwgamesController } from './wwgames.controller';

describe('WwgamesController', () => {
  let controller: WwgamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WwgamesController],
    }).compile();

    controller = module.get<WwgamesController>(WwgamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
