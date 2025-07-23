// src/adminpanelauth/adminpanelauth.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AdminpanelauthService } from './adminpanelauth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard'; // We'll create this
import { Request as ExpressRequest } from 'express';

@Controller('admin/auth')
export class AdminpanelauthController {
  constructor(private readonly authService: AdminpanelauthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: ExpressRequest) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    // Set refresh token as HTTP-only cookie
    if (req.res) {
      req.res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false, // set to true in production (HTTPS)
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }

    return {
      success: true,
      access_token: accessToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return {
      success: true,
      user: req.user,
    };
  }

  @Post('refresh')
  async refreshToken(@Req() req: ExpressRequest) {
    const token = req.cookies['refresh_token'];
    if (!token) throw new UnauthorizedException('No refresh token provided');

    try {
      const decoded = this.authService.verifyRefreshToken(token);
      const newAccessToken = this.authService.generateAccessToken(decoded);
      return {
        success: true,
        access_token: newAccessToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
