import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../../entities/client.entity';
import { AddClientDto } from '../../dtos/client/add.client.dto';
import { EditClientDto } from '../../dtos/client/edit.client.dto';
import { ApiResponse } from 'src/controllers/misc/api.response.class';
import { resolve } from 'dns';


@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client) 
        private readonly client: Repository<Client>,
    ) { }

    getAll(): Promise<Client[]> {
        return this.client.find();
    }

    getById(id: number): Promise<Client | ApiResponse> {
        return this.client.findOne(id);
    }

    //add
    add(data: AddClientDto): Promise<Client | ApiResponse>{
        // DTO      => Model
        // username -> username; itd
        const newClient: Client = new Client();
        newClient.forename = data.forename;
        newClient.surname = data.surname;
        newClient.email = data.email;
        newClient.phone = data.phone;

        return new Promise((resolve) =>{
            this.client.save(newClient)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiResponse = new ApiResponse("error",-1001);
                resolve(response);
            });
        });
        
        //U USER>SERVICE!!!! password is special (needed in user!!!)
        //import * as crypto from "crypto";
        //const passwordHash = crypto.createHash('sha512');
        //passwordHash.update(data.password);
    }

    //editById
    async editById(id: number, data: EditClientDto): Promise<Client | ApiResponse>{
        const newClient: Client = await this.client.findOne(id);
        
        if (newClient === undefined) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error",-1002));
            });
        }

        newClient.surname = data.surname;
        newClient.phone = data.phone;
        return this.client.save(newClient);

    }
    //deleteById
}
