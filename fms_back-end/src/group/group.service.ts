import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupRepository } from './group.repository';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
    constructor(
        private groupRepository:GroupRepository,
    ){}
    
    createGroup = async(createGroupDto : CreateGroupDto):Promise<boolean>=>{
        const group = await this.findOneGroupName(createGroupDto.name);
        
        if(group){
            throw new ConflictException(`${createGroupDto.name} is already exist`);
        }
        try{
            const createGroup = this.groupRepository.create(createGroupDto);
            await this.groupRepository.save(createGroup)
            return true;
        }catch(err){
            return false;
        }
        
        
    }

    /**
     * GET 그룹명 단일 조회 (중복검사 용도)
     * @param groupName 
     * @returns 
     */
    findOneGroupName = async(groupName:string):Promise<Group> => {
        const group = await this.groupRepository.findOne({
            where : {name:groupName}
        })
        return group;
    }

    findAllGroup = async():Promise<Group[]> => {
        return await this.groupRepository.find();
    }
}
