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
exports.ConferenceRoom = void 0;
const typeorm_1 = require("typeorm");
const rentable_entity_1 = require("./rentable.entity");
let ConferenceRoom = class ConferenceRoom {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        type: "int",
        name: "conference_room_id",
        unsigned: true,
    }),
    __metadata("design:type", Number)
], ConferenceRoom.prototype, "conferenceRoomId", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 20, scale: 2 }),
    __metadata("design:type", Number)
], ConferenceRoom.prototype, "area", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", width: 1 }),
    __metadata("design:type", Boolean)
], ConferenceRoom.prototype, "projector", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", width: 1 }),
    __metadata("design:type", Boolean)
], ConferenceRoom.prototype, "platform", void 0);
__decorate([
    typeorm_1.Column({ name: "sound_system", type: "tinyint", width: 1 }),
    __metadata("design:type", Boolean)
], ConferenceRoom.prototype, "soundSystem", void 0);
__decorate([
    typeorm_1.Column({ name: "rentable_id", type: "int", unique: true, unsigned: true }),
    __metadata("design:type", Number)
], ConferenceRoom.prototype, "rentableId", void 0);
__decorate([
    typeorm_1.OneToOne(() => rentable_entity_1.Rentable, (rentable) => rentable.conferenceRoom, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "rentable_id", referencedColumnName: "rentableId" }]),
    __metadata("design:type", rentable_entity_1.Rentable)
], ConferenceRoom.prototype, "rentable", void 0);
ConferenceRoom = __decorate([
    typeorm_1.Index("fk_conference_room_rentable_id", ["rentableId"], { unique: true }),
    typeorm_1.Entity("conference_room")
], ConferenceRoom);
exports.ConferenceRoom = ConferenceRoom;
//# sourceMappingURL=conferenceRoom.entity.js.map