import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('beckend-auth')
export class GoogleAuthController {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const googleUser = req.user;

    let user = await this.userRepo.findOne({ where: { email: googleUser.email } });

    if (!user) {
      user = this.userRepo.create({
        // Make sure these properties exist in Users entity
        // If not, add them to Users entity or remove them here
        ...(googleUser.email && { email: googleUser.email }),
        ...(googleUser.firstName && googleUser.lastName && { name: `${googleUser.firstName} ${googleUser.lastName}` }),
        provider: 'google',
        isVerified: true,
      } as Partial<Users>);
      await this.userRepo.save(user);
    }

    const token = this.jwtService.sign({ id: user.id });

    // For local dev, return token directly
    return res.json({ token });
  }
}
