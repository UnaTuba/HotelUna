import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
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
import { ClientController } from './controllers/api/client.controller';
import { RoomController } from './controllers/api/room.controller';
import { RoomService } from './services/room/room.service';
import { RentableService } from './services/rentable/rentable.service';
import { RentableController } from './controllers/api/rentable.controller';
import { ReservationController } from './controllers/api/reservation.controller';
import { ReservationService } from './services/reservation/reservation.service';
import { UserController } from './controllers/api/user.controller';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';


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
    TypeOrmModule.forFeature([ 
      Client,
      User,
      Room, 
      Rentable,
      Reservation,
    ])
  ],
  controllers: [
    AppController,
    ClientController,
    RoomController,
    RentableController,
    ReservationController,
    UserController,
    AuthController,
  ],
  providers: [
    ClientService,
    UserService,
    RoomService,
    RentableService,
    ReservationService,
  ],
  exports: [
    UserService,
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude('auth/*')
    .forRoutes('api/*');
  }
}
