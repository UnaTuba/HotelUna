import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rentable } from "./rentable.entity";

@Index("fk_conference_room_rentable_id", ["rentableId"], { unique: true })
@Entity("conference_room")
export class ConferenceRoom {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "conference_room_id",
    unsigned: true,
  })
  conferenceRoomId: number;

  @Column( { type: "decimal", precision: 20, scale: 2 })
  area: number;

  @Column( { type: "tinyint", width: 1 })
  projector: boolean;

  @Column({ type: "tinyint", width: 1 })
  platform: boolean;

  @Column({ name: "sound_system", type: "tinyint", width: 1 })
  soundSystem: boolean;

  @Column({ name: "rentable_id", type: "int",unique: true, unsigned: true })
  rentableId: number;

  @OneToOne(() => Rentable, (rentable) => rentable.conferenceRoom, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "rentable_id", referencedColumnName: "rentableId" }])
  rentable: Rentable;
}
