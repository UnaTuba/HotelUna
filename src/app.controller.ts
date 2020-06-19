import { Controller, Get } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { ClientService } from './services/client/client.service';
import { Client } from '../entities/client.entity';
import { User } from '../entities/user.entity';

@Controller()
export class AppController {
  constructor(
    private userService: UserService,
    private clientService: ClientService
  ){}

  @Get() // http://localhost:3000/
  getIndex(): string {
    return 'Home page!';
  }
  @Get('world') // http://localhost:3000/world
  getWorld(): string {
    return 'World';
  }
  @Get('api/client') // http://localhost:3000/api/client
  getAllClients(): Promise<Client[]> {
    return this.clientService.getAll();
  }
  @Get('api/user') // http://localhost:3000/api/clientuser
  getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }
}
