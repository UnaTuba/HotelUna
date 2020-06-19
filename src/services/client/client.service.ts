import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../../entities/client.entity';
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
    //editById
    //deleteById
}
