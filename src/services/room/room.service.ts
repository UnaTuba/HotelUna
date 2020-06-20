import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Room } from "entities/room.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RoomService extends TypeOrmCrudService<Room>{
    constructor(
        @InjectRepository(Room)
        private readonly room: Repository<Room>,
    ){
            super(room);
    }
}