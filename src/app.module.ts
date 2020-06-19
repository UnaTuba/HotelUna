import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user/user.service';
import { ClientService } from './services/client/client.service';
import { ConferenceRoom } from '../entities/conferenceRoom.entity';
import { Room } from '../entities/room.entity';
import { Rentable } from '../entities/rentable.entity';
import { Reservation } from '../entities/reservation.entity';
import { User } from '../entities/user.entity';
import { Client } from '../entities/client.entity';
import { DatabaseConfiguration } from '../config/database.configuration';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [ 
        User, 
        Client,
        ConferenceRoom,
        Room,
        Rentable,
        Reservation, 
      ]
    }),
    TypeOrmModule.forFeature([ User, Client ])
  ],
  controllers: [AppController],
  providers: [UserService,ClientService],
})
export class AppModule {}
