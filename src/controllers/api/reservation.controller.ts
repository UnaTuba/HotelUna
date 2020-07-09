import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Reservation } from "entities/reservation.entity";
import { ReservationService } from "src/services/reservation/reservation.service";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";

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
    },
    routes: {
        only: [
            "createOneBase",
            "createManyBase",
            "getManyBase",
            "getOneBase",
            "updateOneBase"
        ],
        createOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles('user')
            ]
        },
        getManyBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles('user')
            ]
        },
        getOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles('user')
            ]
        },
        createManyBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles('user')
            ]
        },
        updateOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles('user')
            ]
        }
    }
})
export class ReservationController{
    constructor(public service: ReservationService){ }
}