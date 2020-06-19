import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rentable } from "./rentable.entity";

@Index("uq_room_room_number", ["roomNumber"], { unique: true })
@Index("fk_room_rentable_id", ["rentableId"], { unique: true })
@Entity("room")
export class Room {
  @PrimaryGeneratedColumn({ type: "int", name: "room_id", unsigned: true })
  roomId: number;

  @Column({ type: "int", name: "num_of_beds" })
  numOfBeds: number;

  @Column({
    type: "enum", 
    name: "bed_type",
    enum: ["single", "double", "bunk_bed", "king_size"],
  })
  bedType: "single" | "double" | "bunk_bed" | "king_size";

  @Column({ type: "tinyint", width: 1 })
  balcony: boolean;

  @Column("enum", {
    enum: ["east", "west", "south", "north"],
  })
  orientation: "east" | "west" | "south" | "north";

  @Column({ type: "int" })
  floor: number;

  @Column( { type: "tinyint", width: 1 })
  closet: boolean;

  @Column({ type: "tinyint", width: 1 })
  hairdryer: boolean;

  @Column({ type: "tinyint", width: 1 })
  desk: boolean;

  @Column({ type: "tinyint", name: "air_conditioner", width: 1 })
  airConditioner: boolean;

  @Column({ type: "int", name: "room_number", unique: true })
  roomNumber: number;

  @Column({ type: "int", name: "rentable_id", unique: true, unsigned: true })
  rentableId: number;

  @OneToOne(() => Rentable, (rentable) => rentable.room, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "rentable_id", referencedColumnName: "rentableId" }])
  rentable: Rentable;
}
