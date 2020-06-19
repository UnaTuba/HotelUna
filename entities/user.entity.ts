import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Reservation } from "./reservation.entity";
  
  @Index("uq_user_email", ["email"], { unique: true })
  @Index("uq_user_username", ["username"], { unique: true })
  @Entity("user")
  export class User {
    @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
    userId: number;
  
    @Column({type: "varchar", length: 64 })
    forename: string;
  
    @Column({type: "varchar", length: 64 })
    surname: string;
  
    @Column({type: "varchar"})
    address: string;
  
    @Column({type: "varchar",  length: 64 })
    phone: string;
  
    @Column({type: "varchar",  unique: true, length: 64 })
    email: string;
  
    @Column({type: "varchar", unique: true, length: 64 })
    username: string;
  
    @Column({type: "varchar",  length: 128 })
    password: string;
  
    @Column({type: "text" })
    salt: string;
  
    @Column({type: "timestamp",
      name: "registration_date",
      default: () => "CURRENT_TIMESTAMP",
    })
    registrationDate: Date;
  
    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];
  }
  