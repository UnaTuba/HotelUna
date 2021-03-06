import { Controller, Get, Param, Put, Body, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { AddUserDto } from "../../dtos/user/add.user.dto";
import { EditUserDto } from "../../dtos/user/edit.user.dto";
import { ApiResponse } from "../misc/api.response.class";
import { UserService } from "src/services/user/user.service";
import { User } from "entities/user.entity";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";

@Controller('api/user')
export class UserController {
    constructor(
        private userService: UserService
      ){}

    @Get() //GET http://localhost:3000/api/user/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }
    
    @Get(':id') // http://localhost:3000/api/user/4/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    async getById( @Param('id') userId: number): Promise<User | ApiResponse> {
        return new Promise(async (resolve) => {
            const userOne = await this.userService.getById(userId);

            if (userOne === undefined){
                resolve(new ApiResponse("error",-1002));
            }

            resolve(userOne);
        });
    }

    @Put('') //PUT http://localhost:3000/api/user/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    add( @Body() data: AddUserDto): Promise<User | ApiResponse>{
        return this.userService.add(data);
    }
    
    @Post(':id') //POST http://localhost:3000/api/user/4
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    edit( @Param('id') userId: number, @Body() data: EditUserDto): Promise<User | ApiResponse> {
        return this.userService.editById(userId,data);
    }
}