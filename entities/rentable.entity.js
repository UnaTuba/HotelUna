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
exports.Rentable = void 0;
const typeorm_1 = require("typeorm");
const conferenceRoom_entity_1 = require("./conferenceRoom.entity");
const reservation_entity_1 = require("./reservation.entity");
const room_entity_1 = require("./room.entity");
let Rentable = class Rentable {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "rentable_id", unsigned: true }),
    __metadata("design:type", Number)
], Rentable.prototype, "rentableId", void 0);
__decorate([
    typeorm_1.Column({ type: "int", name: "max_capacity" }),
    __metadata("design:type", Number)
], Rentable.prototype, "maxCapacity", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], Rentable.prototype, "wifi", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Rentable.prototype, "price", void 0);
__decorate([
    typeorm_1.OneToOne(() => conferenceRoom_entity_1.ConferenceRoom, (conferenceRoom) => conferenceRoom.rentable),
    __metadata("design:type", conferenceRoom_entity_1.ConferenceRoom)
], Rentable.prototype, "conferenceRoom", void 0);
__decorate([
    typeorm_1.OneToMany(() => reservation_entity_1.Reservation, (reservation) => reservation.rentable),
    __metadata("design:type", Array)
], Rentable.prototype, "reservations", void 0);
__decorate([
    typeorm_1.OneToOne(() => room_entity_1.Room, (room) => room.rentable),
    __metadata("design:type", room_entity_1.Room)
], Rentable.prototype, "room", void 0);
Rentable = __decorate([
    typeorm_1.Entity("rentable")
], Rentable);
exports.Rentable = Rentable;
//# sourceMappingURL=rentable.entity.js.map