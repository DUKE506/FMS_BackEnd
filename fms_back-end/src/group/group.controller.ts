import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

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
}
