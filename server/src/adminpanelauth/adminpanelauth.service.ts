// src/adminpanelauth/adminpanelauth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AdminpanelauthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new UnauthorizedException('Admin already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const admin = this.adminRepo.create({ email: dto.email, password: hashedPassword });
    await this.adminRepo.save(admin);

    return { message: 'Admin registered successfully' };
  }

  async login(dto: LoginDto) {
    const admin = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: admin.id, email: admin.email, role: 'admin' };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  generateAccessToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET || 'access_secret', {
      expiresIn: '15m',
    });
  }

  generateRefreshToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'refresh_secret', {
      expiresIn: '7d',
    });
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_secret');
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'access_secret');
  }
}
