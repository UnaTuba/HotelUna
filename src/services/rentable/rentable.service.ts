import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rentable } from "entities/rentable.entity";
import { ApiResponse } from "src/controllers/misc/api.response.class";
import { RentableDto } from "src/dtos/rentables/rentable.dto";

@Injectable()
export class RentableService extends TypeOrmCrudService<Rentable>{
    constructor(
        @InjectRepository(Rentable)
        private readonly rentable: Repository<Rentable>,
    ){
            super(rentable);
    }

    async add(data: RentableDto): Promise<Rentable | ApiResponse> {
        const newRentable: Rentable = new Rentable();
        newRentable.wifi = data.wifi;
        newRentable.price = data.price;
        newRentable.maxCapacity = data.maxCapacity;
       
        try {
            const savedRentable = await this.rentable.save(newRentable);

            if (!savedRentable) {
                throw new Error('');
            }

            return savedRentable;
        } catch (e) {
            return new ApiResponse('error', -6001, 'This rentable cannot be created.');
        }
    }
    
}