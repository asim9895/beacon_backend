import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: any;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  date_of_birth: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: false })
  email_verified: boolean;

  @Column({ default: false })
  phone_number_verified: boolean;

  @Column({ nullable: true })
  email_verification_code: string;

  @Column({ nullable: true })
  phone_number_verification_code: string;

  @Column({ nullable: true })
  forgot_password_code: string;

  @Column({ nullable: true })
  auth_otp_code: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  modifiedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "createdBy" })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "modifiedBy" })
  modifiedBy: User;
}
