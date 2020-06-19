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
exports.Reservation = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("./client.entity");
const rentable_entity_1 = require("./rentable.entity");
const user_entity_1 = require("./user.entity");
let Reservation = class Reservation {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        type: "int",
        name: "room_reservation_id",
        unsigned: true,
    }),
    __metadata("design:type", Number)
], Reservation.prototype, "roomReservationId", void 0);
__decorate([
    typeorm_1.Column({ type: "int", name: "client_id", unsigned: true }),
    __metadata("design:type", Number)
], Reservation.prototype, "clientId", void 0);
__decorate([
    typeorm_1.Column({ type: "int", name: "rentable_id", unsigned: true }),
    __metadata("design:type", Number)
], Reservation.prototype, "rentableId", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime", name: "from_date" }),
    __metadata("design:type", Date)
], Reservation.prototype, "fromDate", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime", name: "to_date" }),
    __metadata("design:type", Date)
], Reservation.prototype, "toDate", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "reservation_date",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Reservation.prototype, "reservationDate", void 0);
__decorate([
    typeorm_1.Column("decimal", { name: "total_price", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Reservation.prototype, "totalPrice", void 0);
__decorate([
    typeorm_1.Column("text", { name: "note", nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "note", void 0);
__decorate([
    typeorm_1.Column("int", { name: "user_id", unsigned: true }),
    __metadata("design:type", Number)
], Reservation.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => client_entity_1.Client, (client) => client.reservations, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }]),
    __metadata("design:type", client_entity_1.Client)
], Reservation.prototype, "client", void 0);
__decorate([
    typeorm_1.ManyToOne(() => rentable_entity_1.Rentable, (rentable) => rentable.reservations, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "rentable_id", referencedColumnName: "rentableId" }]),
    __metadata("design:type", rentable_entity_1.Rentable)
], Reservation.prototype, "rentable", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.reservations, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "user_id", referencedColumnName: "userId" }]),
    __metadata("design:type", user_entity_1.User)
], Reservation.prototype, "user", void 0);
Reservation = __decorate([
    typeorm_1.Index("fk_reservation_client_id", ["clientId"], {}),
    typeorm_1.Index("fk_reservation_rentable_id", ["rentableId"], {}),
    typeorm_1.Index("fk_reservation_user_id", ["userId"], {}),
    typeorm_1.Entity("reservation")
], Reservation);
exports.Reservation = Reservation;
//# sourceMappingURL=reservation.entity.js.map