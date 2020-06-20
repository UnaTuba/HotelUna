import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Rentable } from "entities/rentable.entity";
import { RentableService } from "src/services/rentable/rentable.service";

@Controller('api/rentable')
@Crud({
    model: {
        type: Rentable
    },
    params: {
        id: {
            field: 'rentable_id',
            type: 'number',
            primary: true,
        }
    },
    query: {
        join: {
            room: {
                eager: true
            },
            conferenceRoom: {
                eager: true
            },
            clients: {
                eager: true
            }
        }
    }
})
export class RentableController{
    constructor(public service: RentableService){ }
}