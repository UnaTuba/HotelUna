import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/controllers/misc/api.response.class';
import { resolve } from 'dns';
import { User } from 'entities/user.entity';
import { AddUserDto } from 'src/dtos/user/add.user.dto';
import * as crypto from "crypto";
import { EditUserDto } from 'src/dtos/user/edit.user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly user: Repository<User>,
    ) { }

    getAll(): Promise<User[]> {
        return this.user.find();
    }

    async getByUsername(username: string): Promise<User | null> {
        const user = await this.user.findOne({username: username});

        if(user){
            return user;
        }
        return null;
    }

    getById(id: number): Promise<User | ApiResponse> {
        return this.user.findOne(id);
    }

    //add
    add(data: AddUserDto): Promise<User | ApiResponse>{
        // DTO      => Model
        // username -> username; itd
        const newUser: User = new User();
        newUser.forename = data.forename;
        newUser.surname = data.surname;
        newUser.email = data.email;
        newUser.address = data.address;
        newUser.phone = data.phone;
        newUser.username = data.username;

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        newUser.password = passwordHashString;

        return new Promise((resolve) =>{
            this.user.save(newUser)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiResponse = new ApiResponse("error",-1001);
                resolve(response);
            });
        });
    }

    async register(data: AddUserDto): Promise<User | ApiResponse>{
        // DTO      => Model
        // username -> username; itd
        const newUser: User = new User();
        newUser.forename = data.forename;
        newUser.surname = data.surname;
        newUser.email = data.email;
        newUser.phone = data.phone;
        newUser.username = data.username;
        
        const passwordH = crypto.createHash('sha512');
        passwordH.update(data.password);
        const passwordHashString = passwordH.digest('hex').toUpperCase();
        newUser.password = passwordHashString;

        try {
            const savedUser = await this.user.save(newUser);

            if(!savedUser) {
                throw new Error('');
            }
            return savedUser;
        } catch (e){
            return new ApiResponse('error',-6001,'This user account cannot be created');
        }
    }

    //editById
    async editById(id: number, data: EditUserDto): Promise<User | ApiResponse>{
        const newUser: User = await this.user.findOne(id);
        
        if (newUser === undefined) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error",-1002));
            });
        }

        newUser.surname = data.surname;
        newUser.phone = data.phone;
        newUser.forename = data.forename;
        newUser.address = data.address;

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        newUser.password = data.password;

        return this.user.save(newUser);

    }
    //deleteById
}
