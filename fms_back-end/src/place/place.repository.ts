import { DataSource, Repository } from "typeorm";
import { Place } from "./place.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class PlaceRespository extends Repository<Place>{
    constructor(
        private dataSource : DataSource
    ){
        super(Place, dataSource.createEntityManager());
    }

}