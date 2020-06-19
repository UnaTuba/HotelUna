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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("../../services/client/client.service");
const add_client_dto_1 = require("../../dtos/client/add.client.dto");
const edit_client_dto_1 = require("../../dtos/client/edit.client.dto");
let ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    getAll() {
        return this.clientService.getAll();
    }
    getById(clientId) {
        return this.clientService.getById(clientId);
    }
    add(data) {
        return this.clientService.add(data);
    }
    edit(clientId, data) {
        return this.clientService.editById(clientId, data);
    }
};
__decorate([
    common_1.Get() //GET http://localhost:3000/api/client/
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id') // http://localhost:3000/api/client/4/
    ,
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getById", null);
__decorate([
    common_1.Put('') //PUT http://localhost:3000/api/client/
    ,
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_client_dto_1.AddClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "add", null);
__decorate([
    common_1.Post(':id') //POST http://localhost:3000/api/client/4
    ,
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, edit_client_dto_1.EditClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "edit", null);
ClientController = __decorate([
    common_1.Controller('api/client'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map