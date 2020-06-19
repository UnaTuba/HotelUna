import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../../entities/client.entity';
import { AddClientDto } from '../../dtos/client/add.client.dto';
import { EditClientDto } from '../../dtos/client/edit.client.dto';


@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client) 
        private readonly client: Repository<Client>,
    ) { }

    getAll(): Promise<Client[]> {
        return this.client.find();
    }

    getById(id: number): Promise<Client> {
        return this.client.findOne(id);
    }

    //add
    add(data: AddClientDto): Promise<Client>{
        // DTO      => Model
        // username -> username; itd
        const newClient: Client = new Client();
        newClient.forename = data.forename;
        newClient.surname = data.surname;
        newClient.email = data.email;
        newClient.phone = data.phone;

        return this.client.save(newClient);
        
        //U USER>SERVICE!!!! password is special (needed in user!!!)
        //import * as crypto from "crypto";
        //const passwordHash = crypto.createHash('sha512');
        //passwordHash.update(data.password);
    }

    //editById
    async editById(id: number, data: EditClientDto): Promise<Client>{
        const newClient: Client = await this.client.findOne(id);

        newClient.surname = data.surname;
        newClient.phone = data.phone;
        return this.client.save(newClient);

    }
    //deleteById
}
