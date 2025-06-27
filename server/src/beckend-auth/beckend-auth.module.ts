import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Users } from 'src/user/user.entity';
import { BeckendAuthController } from './beckend-auth.controller';
import { BeckendAuthService } from './beckend-auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthController } from './strategies/google.controller';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    MailerModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'P@9!cQn5J4rXvLwzT7d',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [BeckendAuthController,GoogleAuthController],
  providers: [BeckendAuthService,GoogleStrategy],
})
export class BeckendAuthModule {}
