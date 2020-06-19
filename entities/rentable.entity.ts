import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ConferenceRoom } from "./conferenceRoom.entity";
import { Reservation } from "./reservation.entity";
import { Room } from "./room.entity";

@Entity("rentable")
export class Rentable {
  @PrimaryGeneratedColumn({ type: "int", name: "rentable_id", unsigned: true })
  rentableId: number;

  @Column({ type: "int", name: "max_capacity" })
  maxCapacity: number;

  @Column( { type: "tinyint", nullable: true, width: 1 })
  wifi: boolean | null;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => ConferenceRoom, (conferenceRoom) => conferenceRoom.rentable)
  conferenceRoom: ConferenceRoom;

  @OneToMany(() => Reservation, (reservation) => reservation.rentable)
  reservations: Reservation[];

  @OneToOne(() => Room, (room) => room.rentable)
  room: Room;
}
