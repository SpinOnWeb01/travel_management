import { Injectable, Inject, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/user/user.entity';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class BeckendAuthService {
  debugCacheKeys() {
    throw new Error('Method not implemented.');
  }
  private readonly OTP_KEY_PREFIX = 'otp:';
  authService: any;

  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {
    console.log(`Cache store type: ${cacheManager.stores.constructor.name}`);
  }

 async signupMobile(phone: string, email: string, password: string) {
  const existing = await this.userRepo.findOne({ where: { phone } });
  if (existing) throw new Error('Already registered');

  const hash = await bcrypt.hash(password, 10);
  const user = this.userRepo.create({ phone, email, password: hash, provider: 'local' });
  const saved = await this.userRepo.save(user);

  await this.sendOtp(saved.id, saved.email, saved.phone);
  
  return { userId: saved.id, message: 'OTP sent' };
}


  private async storeOtpWithVerification(userId: number, otp: string): Promise<void> {
    const key = `${this.OTP_KEY_PREFIX}${userId}`;
    
    try {
      // Use milliseconds (10 minutes = 600000 ms)
      await this.cacheManager.set(key, otp, 600000);
      
      // Immediate verification
      const storedValue = await this.cacheManager.get(key);
      
      if (storedValue !== otp) {
        console.error(`[CACHE FAILURE] Set ${otp} but got ${storedValue} for user ${userId}`);
        throw new Error('OTP storage failed');
      }
      
      console.log(`✅ OTP stored for user ${userId} at key ${key}`);
    } catch (error) {
      console.error(`[OTP STORAGE ERROR] For user ${userId}: ${error.message}`);
      throw new Error('Failed to store OTP');
    }
  }

async sendOtp(userId: number, email: string | undefined, phone: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await this.storeOtpWithVerification(userId, otp);
  if (email) {
    await this.mailerService.sendOtp(email, otp); // Send only if email exists
  }
  await this.sendOtpToMobile(phone, otp);
  console.log(`📧 OTP sent to user ${userId} at ${email || phone}`);
}



  async sendOtpToEmail(email: string) {
    email = email.toLowerCase().trim();
    console.log(`[OTP REQUEST] For email: ${email}`);
    
    let user = await this.userRepo.findOne({ 
      where: { email },
      select: ['id']
    });
    
    if (!user) {
      console.log(`[NEW USER] Creating account for: ${email}`);
      user = this.userRepo.create({ 
        email, 
        provider: 'local', 
        isVerified: false 
      });
      await this.userRepo.save(user);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.storeOtpWithVerification(user.id, otp);
    await this.mailerService.sendOtp(email, otp);
    
    console.log(`📧 OTP sent to user ${user.id} at ${email}`);
    return { userId: user.id, message: 'OTP sent' };
  }

  // beckend-auth.service.ts
// beckend-auth.service.ts

async getOtp(userId: number): Promise<string | null> {
  const key = `${this.OTP_KEY_PREFIX}${userId}`;
  const otp = await this.cacheManager.get<string>(key);

  // Key listing for diagnostics
  try {
    if (typeof this.cacheManager.stores.keys === 'function') {
      const keys = await this.cacheManager.stores.keys();
      console.log(`🔑 All OTP keys: ${Array.from(keys).join(', ')}`);
    }
  } catch (error) {
    console.error('Failed to list keys', error);
  }

  return otp === undefined ? null : otp;
}


private async sendOtpToMobile(phone: string, otp: string) {
  console.log(`📱 OTP sent to phone ${phone}: ${otp}`);
  // Integrate Twilio / Gupshup / Msg91 here
}

  async verifyOtp(userId: number, otp: string): Promise<boolean> {
    const key = `${this.OTP_KEY_PREFIX}${userId}`;
    console.log(`[VERIFY] User: ${userId}, Key: ${key}, Input: ${otp}`);
    
    try {
      const cachedOtp = await this.cacheManager.get<string>(key);
      console.log(`[VERIFY] Retrieved OTP: ${cachedOtp}`);
      
      if (!cachedOtp) {
        console.error(`❌ OTP not found for user ${userId} at key ${key}`);
        
        // Fixed key listing
        try {
          if (typeof this.cacheManager.stores.keys === 'function') {
            const keys = await this.cacheManager.stores.keys();
            console.log(`🗝️ All cache keys: ${Array.from(keys).join(', ')}`);
          } else {
            console.log('🗝️ Key listing not supported');
          }
        } catch (error) {
          console.error('Failed to list keys', error);
        }
        
        return false;
      }
      
      if (cachedOtp !== otp.trim()) {
        console.error(`❌ OTP mismatch for user ${userId}: Cached ${cachedOtp} vs Input ${otp}`);
        return false;
      }
      
      // Delete OTP after successful verification
      await this.cacheManager.del(key);
      console.log(`✅ OTP verified for user ${userId}`);
      
      // Update user verification status
      await this.userRepo.update(userId, { isVerified: true });
      return true;
    } catch (error) {
      console.error(`[VERIFY ERROR] For user ${userId}: ${error.message}`);
      return false;
    }
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

  // beckend-auth.service.ts
@Get('cache-diagnostics/:userId')
async cacheDiagnostics(@Param('userId') userId: number) {
  const key = `otp:${userId}`;
  const otp = await this.authService.getOtp(userId); // returns string or null

  // Only for debug, not for production
  const debugOtps = this.authService.getDebugOtps ? await this.authService.getDebugOtps() : {};

  return {
    userId,
    key,
    storedOtp: otp,
    debugOtps // Shows all debug OTPs in memory
  };
}




}
