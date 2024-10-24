import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AdminPlaceService } from './admin-place.service';
import { CreateAdminPlaceDto } from './dto/create-admin-place.dto';
import { CreatePlaceAdminDto } from './dto/create-place-admin-dto';

@Controller('admin-place')
export class AdminPlaceController {
    constructor(
        private adminPlaceService : AdminPlaceService
    ){}


    @Post()
    createPlaceAdmin(
        @Body(ValidationPipe) createPlaceAdminDto:CreatePlaceAdminDto
    ){
        return this.adminPlaceService.createPlaceAdmin(createPlaceAdminDto);
    }

    
}
