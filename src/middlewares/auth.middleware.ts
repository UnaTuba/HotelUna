import { NestMiddleware, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/services/user/user.service";
import * as jwt from 'jsonwebtoken';
import { JwtDataUserDto } from "src/dtos/user/jwt.data.user.dto";
import { jwtSecret } from "config/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor( public userService: UserService){}

    async use(req: Request, res: Response, next: NextFunction) {
        //req.headers.authorization
        if(!req.headers.authorization){
            throw new HttpException('Token not found',HttpStatus.UNAUTHORIZED);
        }
        const tokenString = req.headers.authorization;
        const tokenParts = tokenString.split(' ');
        if(tokenParts.length !== 2){
            throw new HttpException('Token not found',HttpStatus.UNAUTHORIZED);
        }
        const token = tokenParts[1];
        let jwtData: JwtDataUserDto;
        
        try {
            jwtData = jwt.verify(token, jwtSecret);
        } catch (e) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }
        if(!jwtData){
            throw new HttpException('Token not found',HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.ip !== req.ip.toString()){
            throw new HttpException('Token not found, ip',HttpStatus.UNAUTHORIZED);
        }
        if(jwtData.ua !== req.headers["user-agent"]){
            throw new HttpException('Token not found, ua',HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.role === "user"){
            const user = await this.userService.getById(jwtData.userId);
            if(!user){
                throw new HttpException('Account not found',HttpStatus.UNAUTHORIZED);
            }
        }

        const trenutniTimestamp = new Date().getTime() / 1000; // ms/1000 = sec
        if( trenutniTimestamp >=jwtData.ext){
            throw new HttpException('Token expired',HttpStatus.UNAUTHORIZED);
        }

        req.token = jwtData;

        next();
    }
}