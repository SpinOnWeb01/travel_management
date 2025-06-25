import { Test, TestingModule } from '@nestjs/testing';
import { BeckendAuthController } from './beckend-auth.controller';

describe('BeckendAuthController', () => {
  let controller: BeckendAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeckendAuthController],
    }).compile();

    controller = module.get<BeckendAuthController>(BeckendAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
