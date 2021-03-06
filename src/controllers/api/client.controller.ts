import { Controller, UseGuards } from "@nestjs/common";
import { ClientService } from "../../services/client/client.service";
import { Client } from "../../../entities/client.entity";
import { Crud } from "@nestjsx/crud";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";

@Controller('api/client')
@Crud({
    model: {
        type: Client
    },
    params: {
        id: {
            field: 'client_id',
            type: 'number',
            primary: true,
        }
    },
    query: {
        join: {
            rentables: {
                eager: true
            }
        }
    },
    routes: {
        only: [
            "createOneBase",
            "createManyBase",
            "getManyBase",
            "getOneBase"
        ],
        createOneBase: {
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
        getOneBase: {
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
        }
    }
})
export class ClientController {
    constructor(public service: ClientService){}
    
    /*@Post('createFull')
    createFullClient(@Body() data: AddClientDto){
        return this.service.createFullClient(data);
    }*/
}/*
    @Get() //GET http://localhost:3000/api/client/
    getAll(): Promise<Client[]> {
        return this.clientService.getAll();
    }

    @Get(':id') // http://localhost:3000/api/client/4/
    async getById( @Param('id') clientId: number): Promise<Client | ApiResponse> {
        return new Promise(async (resolve) => {
            const clientOne = await this.clientService.getById(clientId);

            if (clientOne === undefined){
                resolve(new ApiResponse("error",-1002));
            }

            resolve(clientOne);
        });
    }

    @Put('') //PUT http://localhost:3000/api/client/
    add( @Body() data: AddClientDto): Promise<Client | ApiResponse>{
        return this.clientService.add(data);
    }
    @Post(':id') //POST http://localhost:3000/api/client/4
    edit( @Param('id') clientId: number, @Body() data: EditClientDto): Promise<Client | ApiResponse> {
        return this.clientService.editById(clientId,data);
    }
}
*/