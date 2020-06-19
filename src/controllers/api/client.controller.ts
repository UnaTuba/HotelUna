import { Controller, Get, Param, Put, Body, Post } from "@nestjs/common";
import { ClientService } from "../../services/client/client.service";
import { Client } from "../../../entities/client.entity";
import { AddClientDto } from "../../dtos/client/add.client.dto";
import { EditClientDto } from "../../dtos/client/edit.client.dto";

@Controller('api/client')
export class ClientController {
    constructor(
        private clientService: ClientService
      ){}

    @Get() //GET http://localhost:3000/api/client/
    getAll(): Promise<Client[]> {
        return this.clientService.getAll();
    }

    @Get(':id') // http://localhost:3000/api/client/4/
    getById( @Param('id') clientId: number): Promise<Client> {
        return this.clientService.getById(clientId);
    }

    @Put('') //PUT http://localhost:3000/api/client/
    add( @Body() data: AddClientDto): Promise<Client>{
        return this.clientService.add(data);
    }
    @Post(':id') //POST http://localhost:3000/api/client/4
    edit( @Param('id') clientId: number, @Body() data: EditClientDto): Promise<Client> {
        return this.clientService.editById(clientId,data);
    }
}