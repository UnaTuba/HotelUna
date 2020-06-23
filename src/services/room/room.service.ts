import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Room } from "entities/room.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiResponse } from "src/controllers/misc/api.response.class";
import { RoomDto } from "src/dtos/room/room.dto";

@Injectable()
export class RoomService extends TypeOrmCrudService<Room>{
    constructor(
        @InjectRepository(Room)
        private readonly room: Repository<Room>,
    ){
            super(room);
    }

    async search(data: RoomDto): Promise<Room | ApiResponse> {
        const builder = await this.room.createQueryBuilder("room");

        /*builder.innerJoinAndSelect(
            "article.articlePrices",
            "ap",
            "ap.createdAt = (SELECT MAX(ap.created_at) FROM article_price AS ap WHERE ap.article_id = article.article_id)"
        );
*/
        builder.leftJoinAndSelect("room", "room.rentable");
        //builder.leftJoinAndSelect("article.features", "features");
        //builder.leftJoinAndSelect("article.photos", "photos");

        builder.where('room.rentableId = :rentableId', { rentableId: data.rentableId });
/*
        if (data.keywords && data.keywords.length > 0) {
            builder.andWhere(`(
                                article.name LIKE :kw OR
                                article.excerpt LIKE :kw OR
                                article.description LIKE :kw
                              )`,
                              { kw: '%' + data.keywords.trim() + '%' });
        }

        if (data.priceMin && typeof data.priceMin === 'number') {
            builder.andWhere('ap.price >= :min', { min: data.priceMin });
        }

        if (data.priceMax && typeof data.priceMax === 'number') {
            builder.andWhere('ap.price <= :max', { max: data.priceMax });
        }

        if (data.features && data.features.length > 0) {
            for (const feature of data.features) {
                builder.andWhere(
                    'af.featureId = :fId AND af.value IN (:fVals)',
                    {
                        fId: feature.featureId,
                        fVals: feature.values,
                    }
                );
            }
        }

        let orderBy = 'article.name';
        let orderDirection: 'ASC' | 'DESC' = 'ASC';

        if (data.orderBy) {
            orderBy = data.orderBy;

            if (orderBy === 'price') {
                orderBy = 'ap.price';
            }
    
            if (orderBy === 'name') {
                orderBy = 'article.name';
            }
        }

        if (data.orderDirection) {
            orderDirection = data.orderDirection;
        }

        builder.orderBy(orderBy, orderDirection);

        let page = 0;
        let perPage: 5 | 10 | 25 | 50 | 75 = 25;

        if (data.page && typeof data.page === 'number') {
            page = data.page;
        }

        if (data.itemsPerPage && typeof data.itemsPerPage === 'number') {
            perPage = data.itemsPerPage;
        }

        builder.skip(page * perPage);
        builder.take(perPage);
*/
        const rooms = await builder.getOne();

        if (rooms === undefined) {
            return new ApiResponse("ok", 0, "No rooms found for these search parameters.");
        }

        return rooms;
    }

}