import {
    Column,
    Entity,
    Index,
    OneToMany,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Reservation } from "./reservation.entity";
import { Rentable } from "./rentable.entity";
import { type } from "os";
  
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

    @ManyToMany(type => Rentable, rentable => rentable.clients)
    @JoinTable({
      name: "reservation",
      joinColumn: { name: "client_id",referencedColumnName: "clientId" },
      inverseJoinColumn: {name: "rentable_id",referencedColumnName: "rentableId"}
    })
    rentables: Rentable[] 
  }
  