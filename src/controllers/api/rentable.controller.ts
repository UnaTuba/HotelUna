import { Controller, UseGuards, Post, Body, Req } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Rentable } from "entities/rentable.entity";
import { RentableService } from "src/services/rentable/rentable.service";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RentableDto } from "src/dtos/rentables/rentable.dto";
import { ApiResponse } from "../misc/api.response.class";

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
                eager: false
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
export class RentableController{
    constructor(public service: RentableService){ }
    @Post()
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    async add(@Body() data: RentableDto): Promise<Rentable | ApiResponse> {
        return await this.service.add(data);
    }
/*
    @Post('register') // POST http://localhost:3000/auth/rentable/register/
    async register(@Body() data: RentableDto) {
        return await this.service.register(data);
    }
*/
}