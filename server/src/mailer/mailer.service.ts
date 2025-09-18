// src/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ankitsharmak87@gmail.com',
      pass: 'nrreviuirzognqkx', // use Gmail App Password here
    },
  });

  async sendOtp(email: string, otp: string) {
    const mailOptions = {
      from: '"Spinonholiday  Management" <ankitsharmak87@gmail.com>',
      to: email,
      subject: 'Your Spinonholiday  OTP Code',
      text: `Hi, your Spinonholiday OTP is code is ${otp} . (Otp is valid for 10 Minutes only)`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
