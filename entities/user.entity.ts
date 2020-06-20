import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { Reservation } from "./reservation.entity";
import * as Validator from 'class-validator';

@Index("uq_user_email", ["email"], { unique: true })
@Index("uq_user_username", ["username"], { unique: true })
@Entity("user")

export class User {
    @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
    userId: number;
  
    @Column({type: "varchar", length: 64 })
    @Validator.IsNotEmpty()
    @Validator.IsAlpha()
    forename: string;
  
    @Column({type: "varchar", length: 64 })
    @Validator.IsString()
    @Validator.IsAlpha()
    surname: string;
  
    @Column({type: "varchar"})
    @Validator.IsNotEmpty()
    address: string;
  
    @Column({type: "varchar",  length: 64 })
    @Validator.IsNotEmpty()
    phone: string;
  
    @Column({type: "varchar",  unique: true, length: 64 })
    @Validator.IsNotEmpty()
    @Validator.IsEmail({
      allow_ip_domain: false,
      allow_utf8_local_part: true,
      require_tld: true,
    })
    email: string;
  
    @Column({type: "varchar", unique: true, length: 64 })
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[a-z][a-z0-9\.]{3,30}[a-z0-9]$/)
    username: string;
  
    @Column({type: "varchar",  length: 128 })
    @Validator.IsNotEmpty()
    @Validator.IsHash('sha512')
    password: string;
  
    /*@Column({type: "text" })
    salt: string;
  */
    @Column({type: "timestamp",
      name: "registration_date",
      default: () => "CURRENT_TIMESTAMP",
    })
    registrationDate: Date;
  
    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];
}
  