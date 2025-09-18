import { Test, TestingModule } from '@nestjs/testing';
import { BeckendService } from './beckend-.service';

describe('BeckendService', () => {
  let service: BeckendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeckendService],
    }).compile();

    service = module.get<BeckendService>(BeckendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
