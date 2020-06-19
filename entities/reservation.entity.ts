import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";
import { Rentable } from "./rentable.entity";
import { User } from "./user.entity";

@Index("fk_reservation_client_id", ["clientId"], {})
@Index("fk_reservation_rentable_id", ["rentableId"], {})
@Index("fk_reservation_user_id", ["userId"], {})
@Entity("reservation")
export class Reservation {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "room_reservation_id",
    unsigned: true,
  })
  roomReservationId: number;

  @Column( { type: "int", name: "client_id", unsigned: true })
  clientId: number;

  @Column({ type: "int",  name: "rentable_id", unsigned: true })
  rentableId: number;

  @Column({ type: "datetime", name: "from_date" })
  fromDate: Date;

  @Column({ type: "datetime", name: "to_date" })
  toDate: Date;

  @Column("timestamp", {
    name: "reservation_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  reservationDate: Date;

  @Column("decimal", { name: "total_price", precision: 10, scale: 2 })
  totalPrice: number;

  @Column("text", { name: "note", nullable: true })
  note: string | null;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @ManyToOne(() => Client, (client) => client.reservations, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Client;

  @ManyToOne(() => Rentable, (rentable) => rentable.reservations, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "rentable_id", referencedColumnName: "rentableId" }])
  rentable: Rentable;

  @ManyToOne(() => User, (user) => user.reservations, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
