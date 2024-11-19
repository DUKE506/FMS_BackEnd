import { Body, Controller, Get, Patch, Post, ValidationPipe } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
    constructor(
        private groupService:GroupService
    ){}

    @Post()
    createGroup(
        @Body(ValidationPipe) createGroupDto : CreateGroupDto
    ){
        return this.groupService.createGroup(createGroupDto);
    }

    @Get()
    findAllGroup(){
        return this.groupService.findAllGroup();
    }

    @Patch()
    updateGroup(
        @Body(ValidationPipe) UpdateGroupDto : UpdateGroupDto
    ){
        return this.groupService.updateGroupName(UpdateGroupDto);
    }
}
