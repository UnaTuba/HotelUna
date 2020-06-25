import { Controller, UseGuards, Post, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Room } from "entities/room.entity";
import { RoomService } from "src/services/room/room.service";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { AddRoomDto } from "src/dtos/room/add.room.dto";
import { ApiResponse } from "../misc/api.response.class";
import { RoomDto } from "src/dtos/room/room.dto";

@Controller('api/room')
@Crud({
    model: {
        type: Room
    },
    params: {
        id: {
            field: 'room_id',
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
export class RoomController{
    constructor(public service: RoomService){ }

    @Post('search')
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    async search(@Body() data: RoomDto): Promise<Room | ApiResponse> {
        return await this.service.search(data);
    }
/*
    @Post('register') // POST http://localhost:3000/auth/room/register/
    async userRegister(@Body() data: AddRoomDto) {
        return await this.service.register(data);
    }
*/
    
}