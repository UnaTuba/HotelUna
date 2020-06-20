import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Room } from "entities/room.entity";
import { RoomService } from "src/services/room/room.service";

@Controller('api/room')
@Crud({
    model: {
        type: Room
    },
    params: {
        id: {
            field: 'roomId',
            type: 'number',
            primary: true,
        }
    },
    query: {
        join: {
            rentable: {
                eager: true
            }
        }
    }
})
export class RoomController{
    constructor(public service: RoomService){ }
}