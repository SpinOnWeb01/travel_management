import { Test, TestingModule } from '@nestjs/testing';
import { BeckendAuthService } from './beckend-auth.service';

describe('BeckendAuthService', () => {
  let service: BeckendAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeckendAuthService],
    }).compile();

    service = module.get<BeckendAuthService>(BeckendAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
