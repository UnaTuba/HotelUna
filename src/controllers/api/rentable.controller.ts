import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Rentable } from "entities/rentable.entity";
import { RentableService } from "src/services/rentable/rentable.service";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";

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
export class RentableController{
    constructor(public service: RentableService){ }
}