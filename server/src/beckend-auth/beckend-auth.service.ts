import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/user/user.entity';

@Injectable()
export class BeckendAuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
  ) {}

  async signupMobile(phone: string, password: string) {
    const existing = await this.userRepo.findOne({ where: { phone } });
    if (existing) throw new Error('Already registered');

    const hash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ phone, password: hash, provider: 'local' });
    const saved = await this.userRepo.save(user);

    await this.sendOtp(saved.id, saved.phone);
    return { userId: saved.id, message: 'OTP sent' };
  }

  // beckend-auth.service.ts
async sendOtp(userId: number, phone: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // ✅ Use 5 minutes in MILLISECONDS (300,000 ms)
  await this.cacheManager.set(`otp_${userId}`, otp, 300_000); 
  
  // Optional: Verify storage
  const confirm = await this.cacheManager.get(`otp_${userId}`);
  console.log(`✅ OTP stored for ${userId}:`, otp, 'Cached:', confirm);
}

  async getOtp(userId: number) {
    const otp = await this.cacheManager.get(`otp_${userId}`);
    console.log(`getOtp() - OTP for user ${userId}: ${otp}`);
    return { otp };
  }

  async verifyOtp(userId: number, otp: string) {
    const storedOtp = await this.cacheManager.get(`otp_${userId}`);
    if (!storedOtp || storedOtp !== otp) throw new Error('Invalid or expired OTP');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    user.isVerified = true;
    await this.userRepo.save(user);

    const token = this.jwtService.sign({ id: user.id });
    return { token };
  }

  async loginMobile(phone: string, password: string) {
  const user = await this.userRepo.findOne({ where: { phone } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  if (!user.isVerified) throw new Error('OTP not verified');

  const token = this.jwtService.sign({ id: user.id });
  return { token };
}

}
