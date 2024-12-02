import { DataSource, Repository } from "typeorm";
import { Place } from "./place.entity";
import { Injectable } from "@nestjs/common";
import { CreatePlaceDto } from "./dto/create-place.dto";


@Injectable()
export class PlaceRespository extends Repository<Place> {
    constructor(
        private dataSource: DataSource
    ) {
        super(Place, dataSource.createEntityManager());
    }

    /**
     * POST 사업장 생성
     * @param createPlaceDto 
     * @returns 
     */
    createPlace = async (createPlaceDto: CreatePlaceDto): Promise<Place> => {
        console.log('발생')
        const place = this.create(createPlaceDto)
        return await this.save(place);

    }
}