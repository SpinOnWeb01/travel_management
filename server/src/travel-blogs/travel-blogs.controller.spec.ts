import { Test, TestingModule } from '@nestjs/testing';
import { TravelBlogsController } from './travel-blogs.controller';

describe('TravelBlogsController', () => {
  let controller: TravelBlogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelBlogsController],
    }).compile();

    controller = module.get<TravelBlogsController>(TravelBlogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
