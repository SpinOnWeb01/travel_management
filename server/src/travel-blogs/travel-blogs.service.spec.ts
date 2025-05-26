import { Test, TestingModule } from '@nestjs/testing';
import { TravelBlogsService } from './travel_blogs.service';

describe('TravelBlogsService', () => {
  let service: TravelBlogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelBlogsService],
    }).compile();

    service = module.get<TravelBlogsService>(TravelBlogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
