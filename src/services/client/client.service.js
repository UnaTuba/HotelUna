"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
/* eslint-disable prefer-const */
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("../../../entities/client.entity");
let ClientService = class ClientService {
    constructor(client) {
        this.client = client;
    }
    getAll() {
        return this.client.find();
    }
    getById(id) {
        return this.client.findOne(id);
    }
    //add
    add(data) {
        // DTO      => Model
        // username -> username; itd
        // eslint-disable-next-line prefer-const
        let newClient = new client_entity_1.Client();
        newClient.forename = data.forename;
        newClient.surname = data.surname;
        newClient.email = data.email;
        newClient.phone = data.phone;
        return this.client.save(newClient);
        //U USER>SERVICE!!!! password is special (needed in user!!!)
        //import * as crypto from "crypto";
        //const passwordHash = crypto.createHash('sha512');
        //passwordHash.update(data.password);
    }
    //editById
    async editById(id, data) {
        let newClient = await this.client.findOne(id);
        newClient.surname = data.surname;
        newClient.phone = data.phone;
        return this.client.save(newClient);
    }
};
ClientService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map