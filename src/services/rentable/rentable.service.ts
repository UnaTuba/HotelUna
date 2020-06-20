import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rentable } from "entities/rentable.entity";

@Injectable()
export class RentableService extends TypeOrmCrudService<Rentable>{
    constructor(
        @InjectRepository(Rentable)
        private readonly rentable: Repository<Rentable>,
    ){
            super(rentable);
    }
}