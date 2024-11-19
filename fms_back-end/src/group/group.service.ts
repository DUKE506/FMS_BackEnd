import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupRepository } from './group.repository';
import { Group } from './group.entity';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UpdateResult } from 'typeorm';

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

    /**
     * GET 그룹명 단일 조회 (ID)
     * @param groupId 
     * @returns 
     */
    findOneGroupId = async(groupId:number):Promise<Group> =>{
        const group = this.groupRepository.findOne({
            where:{id:groupId}
        })

        return group;
    }

    /**
     * 전체 그룹 조회
     * @returns Group[]
     */
    findAllGroup = async():Promise<Group[]> => {
        return await this.groupRepository.find();
    }
    /**
     * PATCH 그룹명 수정
     * --
     * @param updateGroup 
     * @returns 
     */
    updateGroupName = async(updateGroup : UpdateGroupDto):Promise<boolean> =>{
        const {id, ...updateData} = updateGroup;
        const group = await this.findOneGroupId(updateGroup.id);
        if(!group){
            throw new NotFoundException('존재하지 않는 그룹입니다.');
        }
        const update = await this.groupRepository.update(
            { id:group.id },
            {...updateData }
    )
        return update.affected ? true : false;
    }
}
