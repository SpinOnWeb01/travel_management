import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_profile')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  name: string;    // ✅ Add this

  @Column({ nullable: true })
  password: string;

  @Column({ default: 'local' })
  provider: 'google' | 'local';

  @Column({ default: false })
  isVerified: boolean;
    isPhoneVerified: any;
}
