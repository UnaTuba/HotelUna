import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { User } from 'entities/user.entity';
import { UserService } from './services/user/user.service';
import { Client } from 'entities/client.entity';
import { ClientService } from './services/client/client.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [ User, Client ]
    }),
    TypeOrmModule.forFeature([ User, Client ])
  ],
  controllers: [AppController],
  providers: [UserService,ClientService],
})
export class AppModule {}
