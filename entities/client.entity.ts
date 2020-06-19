import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Reservation } from "./reservation.entity";
  
  @Index("uq_client_email", ["email"], { unique: true })
  @Entity("client")
  export class Client {
    @PrimaryGeneratedColumn({ type: "int", name: "client_id", unsigned: true })
    clientId: number;
  
    @Column( {type: "varchar", length: 255 })
    forename: string;
  
    @Column({ type: "varchar", length: 255 })
    surname: string;
  
    @Column({ type: "varchar", unique: true, length: 64 })
    email: string;
  
    @Column({ type: "varchar", length: 64 })
    phone: string;
  
    @OneToMany(() => Reservation, (reservation) => reservation.client)
    reservations: Reservation[];
  }
  