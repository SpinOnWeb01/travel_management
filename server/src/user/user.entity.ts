import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Rename 'Users' to 'User'
@Entity('user_profile')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  dateofbirth: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 'local' })
  provider: 'google' | 'local';

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isPhoneVerified: boolean;
}
