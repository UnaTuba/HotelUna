import { Controller, Get } from '@nestjs/common';
import { User } from 'entities/user.entity';
import { UserService } from './services/user/user.service';

@Controller()
export class AppController {
  constructor(
    private userService: UserService
  ){}

  @Get() // http://localhost:3000/
  getIndex(): string {
    return 'Home page!';
  }
  @Get('world') // http://localhost:3000/world
  getWorld(): string {
    return 'World';
  }

  @Get('api/users') // http://localhost:3000/api/users
  getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }
}
