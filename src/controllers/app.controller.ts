import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { ClientService } from '../services/client/client.service';

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
}
