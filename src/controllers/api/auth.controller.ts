import { Controller, Post, Body, Req, Put } from "@nestjs/common";
import { UserService } from "src/services/user/user.service";
import { LoginUserDto } from "src/dtos/user/login.user.dto";
import { ApiResponse } from "../misc/api.response.class";
import * as crypto from "crypto";
import { LoginInfoUserDto } from "src/dtos/auth/login.info.user.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataUserDto } from "src/dtos/user/jwt.data.user.dto";
import { Request } from "express";
import { jwtSecret } from "config/jwt.secret";
import { AddUserDto } from "src/dtos/user/add.user.dto";

@Controller('auth/')
export class AuthController {
    constructor(public userService: UserService){    }
    
    @Post('user/login')
    async doLogin(@Body() data: LoginUserDto, @Req() req: Request): Promise<ApiResponse | LoginInfoUserDto>{
        const user = await this.userService.getByUsername(data.username);

        if(!user){
            return new Promise(resolve => 
                resolve(new ApiResponse("error",-3001)));
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        
        if(user.password !== passwordHashString){
            return new Promise(resolve => 
                resolve(new ApiResponse("error",-3002)));
        }

        // -- token creation
        const jwtData = new JwtDataUserDto();
        jwtData.role = "user";
        jwtData.username = user.username;
        jwtData.userId = user.userId;

        const sada = new Date();
        sada.setDate(sada.getDate() + 14);
        const istekTimestamp = sada.getTime() / 1000; // ms/1000 = sec
        jwtData.ext = istekTimestamp;

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];
        const token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);
        // --

        const responseObject = new LoginInfoUserDto(
            user.userId,
            user.username,
            token
        );

        return new Promise(resolve => resolve(responseObject));
    }

    @Put('user/register') //PUT http://localhost:3000/auth/user/register
    async userRegister(@Body() data: AddUserDto){
        return await this.userService.register(data);
    }

}