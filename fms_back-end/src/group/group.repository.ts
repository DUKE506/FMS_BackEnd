import { DataSource, Repository } from "typeorm";
import { Group } from "./group.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class GroupRepository extends Repository<Group>{
    constructor(private dataSource : DataSource){
        super(Group, dataSource.createEntityManager());
    }

    
}