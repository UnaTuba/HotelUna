import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from "entities/reservation.entity";

@Injectable()
export class ReservationService extends TypeOrmCrudService<Reservation>{
    constructor(
        @InjectRepository(Reservation)
        private readonly reservation: Repository<Reservation>,
    ){
            super(reservation);
    }
/*
    async createNewReservationForRoom(rentableId: number, clientId: number): Promise<Reservation> {
        const newReservation: Reservation = new Reservation();
        newReservation.rentableId = rentableId;
        newReservation.clientId = clientId;
        return await this.reservation.save(newReservation);
    }
*/
    
}