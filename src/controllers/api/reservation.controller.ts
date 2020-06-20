import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Reservation } from "entities/reservation.entity";
import { ReservationService } from "src/services/reservation/reservation.service";

@Controller('api/reservation')
@Crud({
    model: {
        type: Reservation
    },
    params: {
        id: {
            field: 'reservation_id',
            type: 'number',
            primary: true,
        }
    },
    query: {
        join:{
            rentable: {
                eager: true
            },
            user: {
                eager: false
            },
            client: {
                eager: false
            },
            room: {
                eager: true
            }
        }
    }
})
export class ReservationController{
    constructor(public service: ReservationService){ }
}