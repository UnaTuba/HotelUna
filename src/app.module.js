"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./controllers/app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("./services/user/user.service");
const client_service_1 = require("./services/client/client.service");
const conferenceRoom_entity_1 = require("../entities/conferenceRoom.entity");
const room_entity_1 = require("../entities/room.entity");
const rentable_entity_1 = require("../entities/rentable.entity");
const reservation_entity_1 = require("../entities/reservation.entity");
const user_entity_1 = require("../entities/user.entity");
const client_entity_1 = require("../entities/client.entity");
const database_configuration_1 = require("../config/database.configuration");
const client_controller_1 = require("./controllers/api/client.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: database_configuration_1.DatabaseConfiguration.hostname,
                port: 3306,
                username: database_configuration_1.DatabaseConfiguration.username,
                password: database_configuration_1.DatabaseConfiguration.password,
                database: database_configuration_1.DatabaseConfiguration.database,
                entities: [
                    user_entity_1.User,
                    client_entity_1.Client,
                    conferenceRoom_entity_1.ConferenceRoom,
                    room_entity_1.Room,
                    rentable_entity_1.Rentable,
                    reservation_entity_1.Reservation,
                ]
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, client_entity_1.Client])
        ],
        controllers: [
            app_controller_1.AppController,
            client_controller_1.ClientController,
        ],
        providers: [user_service_1.UserService, client_service_1.ClientService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map