"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const typeorm_1 = require("typeorm");
const rentable_entity_1 = require("./rentable.entity");
let Room = class Room {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "room_id", unsigned: true }),
    __metadata("design:type", Number)
], Room.prototype, "roomId", void 0);
__decorate([
    typeorm_1.Column({ type: "int", name: "num_of_beds" }),
    __metadata("design:type", Number)
], Room.prototype, "numOfBeds", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        name: "bed_type",
        enum: ["single", "double", "bunk_bed", "king_size"],
    }),
    __metadata("design:type", String)
], Room.prototype, "bedType", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", width: 1 }),
    __metadata("design:type", Boolean)
], Room.prototype, "balcony", void 0);
__decorate([
    typeorm_1.Column("enum", {
        enum: ["east", "west", "south", "north"],
    }),
    __metadata("design:type", String)
], Room.prototype, "orientation", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Room.prototype, "floor", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", width: 1 }),
    __metadata("design:type", Boolean)
], Room.prototype, "closet", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", width: 1 }),
    __metadata("design:type", Boolean)
], Room.prototype, "hairdryer", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", width: 1 }),
    __metadata("design:type", Boolean)
], Room.prototype, "desk", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", name: "air_conditioner", width: 1 }),
    __metadata("design:type", Boolean)
], Room.prototype, "airConditioner", void 0);
__decorate([
    typeorm_1.Column({ type: "int", name: "room_number", unique: true }),
    __metadata("design:type", Number)
], Room.prototype, "roomNumber", void 0);
__decorate([
    typeorm_1.Column({ type: "int", name: "rentable_id", unique: true, unsigned: true }),
    __metadata("design:type", Number)
], Room.prototype, "rentableId", void 0);
__decorate([
    typeorm_1.OneToOne(() => rentable_entity_1.Rentable, (rentable) => rentable.room, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "rentable_id", referencedColumnName: "rentableId" }]),
    __metadata("design:type", rentable_entity_1.Rentable)
], Room.prototype, "rentable", void 0);
Room = __decorate([
    typeorm_1.Index("uq_room_room_number", ["roomNumber"], { unique: true }),
    typeorm_1.Index("fk_room_rentable_id", ["rentableId"], { unique: true }),
    typeorm_1.Entity("room")
], Room);
exports.Room = Room;
//# sourceMappingURL=room.entity.js.map