import {
  Injectable,
  Inject,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/user/user.entity';
import { MailerService } from 'src/mailer/mailer.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BeckendAuthService {
  debugCacheKeys() {
    throw new Error('Method not implemented.');
  }
  private readonly OTP_KEY_PREFIX = 'otp:';

  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signupMobile(phone: string, email: string, password: string) {
    if (!phone || !password) {
      throw new BadRequestException('Phone and password are required');
    }

    const normalizedPhone = phone.trim();

    const existing = await this.userRepo.findOne({ where: { phone: normalizedPhone } });
    if (existing) {
      throw new ConflictException('Mobile number already registered');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      phone: normalizedPhone,
      email,
      password: hash,
      provider: 'local',
    });
    const saved = await this.userRepo.save(user);

    await this.sendOtp(saved.id, saved.email, saved.phone);

    return { userId: saved.id, message: 'OTP sent' };
  }

  async initiateSignup(phone: string) {
    if (!phone) throw new BadRequestException('Phone is required');

    const existing = await this.userRepo.findOne({ where: { phone } });
    if (existing) throw new ConflictException('Phone already registered');

    const user = this.userRepo.create({ phone, provider: 'local', isVerified: false });
    const saved = await this.userRepo.save(user);
    await this.sendOtp(saved.id, undefined, phone);
    return { userId: saved.id, message: 'OTP sent' };
  }

  async setPassword(userId: number, password: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');
    if (!user.isVerified) throw new UnauthorizedException('OTP not verified');

    const hash = await bcrypt.hash(password, 10);
    await this.userRepo.update(userId, { password: hash });

    const token = this.jwtService.sign({
      id: user.id,
      phone: user.phone,
    });

    return {
      message: 'Password set successfully',
      token,
      username: user.phone,
    };
  }

  async sendOtp(userId: number, email: string | undefined, phone: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.storeOtpWithVerification(userId, otp);

    if (email) {
      await this.mailerService.sendOtp(email, otp);
    }

    await this.sendOtpToMobile(phone, otp);
    console.log(`📧 OTP sent to user ${userId} at ${email || phone}`);
  }

  private async storeOtpWithVerification(userId: number, otp: string): Promise<void> {
    const key = `${this.OTP_KEY_PREFIX}${userId}`;

    try {
      await this.cacheManager.set(key, otp, 600000); // 10 minutes in ms
      const storedValue = await this.cacheManager.get(key);

      if (storedValue !== otp) {
        console.error(`[CACHE FAILURE] Stored ${otp} but got ${storedValue}`);
        throw new Error('OTP storage failed');
      }

      console.log(`✅ OTP stored for user ${userId}`);
    } catch (error) {
      console.error(`[OTP STORAGE ERROR] For user ${userId}: ${error.message}`);
      throw new Error('Failed to store OTP');
    }
  }

  private async sendOtpToMobile(phone: string, otp: string) {
    const SID = this.configService.get<string>('EXOTEL_SID');
    const TOKEN = this.configService.get<string>('EXOTEL_TOKEN');
    const EXOPHONE = this.configService.get<string>('EXOTEL_PHONE');
    if (!EXOPHONE) {
      throw new Error('EXOTEL_PHONE is not configured');
    }

    const BASE_URL = `https://${SID}:${TOKEN}@api.exotel.com/v1/Accounts/${SID}/Sms/send`;
    const message = `Your OTP is: ${otp}`;

    const params = new URLSearchParams();
    params.append('From', EXOPHONE);
    params.append('To', phone);
    params.append('Body', message);

    try {
      const response = await axios.post(BASE_URL, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      console.log(`✅ SMS sent via Exotel to ${phone}`, response.data);
    } catch (error) {
      console.error(`❌ Failed to send SMS via Exotel`, error?.response?.data || error.message);
      throw new Error('Failed to send OTP via SMS');
    }
  }

  async sendOtpToEmail(email: string) {
    email = email.toLowerCase().trim();
    console.log(`[OTP REQUEST] For email: ${email}`);

    let user = await this.userRepo.findOne({ where: { email }, select: ['id'] });

    if (!user) {
      console.log(`[NEW USER] Creating account for: ${email}`);
      user = this.userRepo.create({ email, provider: 'local', isVerified: false });
      await this.userRepo.save(user);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.storeOtpWithVerification(user.id, otp);
    await this.mailerService.sendOtp(email, otp);

    console.log(`📧 OTP sent to user ${user.id} at ${email}`);
    return { userId: user.id, message: 'OTP sent' };
  }

  async verifyOtp(userId: number, otp: string): Promise<boolean> {
    const key = `${this.OTP_KEY_PREFIX}${userId}`;
    console.log(`[VERIFY] User: ${userId}, Key: ${key}, Input: ${otp}`);

    try {
      const cachedOtp = await this.cacheManager.get<string>(key);
      console.log(`[VERIFY] Retrieved OTP: ${cachedOtp}`);

      if (!cachedOtp) {
        console.error(`❌ OTP not found for user ${userId}`);
        return false;
      }

      if (cachedOtp !== otp.trim()) {
        console.error(`❌ OTP mismatch for user ${userId}`);
        return false;
      }

      await this.cacheManager.del(key);
      await this.userRepo.update(userId, { isVerified: true });

      console.log(`✅ OTP verified for user ${userId}`);
      return true;
    } catch (error) {
      console.error(`[VERIFY ERROR] For user ${userId}: ${error.message}`);
      return false;
    }
  }

  async loginMobile(phone: string, password: string) {
    const user = await this.userRepo.findOne({ where: { phone } });
    if (!user) throw new UnauthorizedException('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid password');

    const token = this.jwtService.sign({
      id: user.id,
      phone: user.phone,
      email: user.email,
    });

    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        email: user.email,
      },
    };
  }

  async getOtp(userId: number): Promise<string | null> {
    const key = `${this.OTP_KEY_PREFIX}${userId}`;
    const otp = await this.cacheManager.get<string>(key);

    try {
      if (typeof this.cacheManager['stores']?.keys === 'function') {
        const keys = await this.cacheManager['stores'].keys();
        console.log(`🔑 All OTP keys: ${Array.from(keys).join(', ')}`);
      }
    } catch (error) {
      console.error('Failed to list keys', error);
    }

    return otp === undefined ? null : otp;
  }
}
