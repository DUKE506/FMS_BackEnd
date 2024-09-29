import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from './place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { TablePlaceDto } from './dto/table-place.dto';

@Controller('place')
export class PlaceController {
    constructor(private placeService: PlaceService) { }

    @Get('/:id')
    async findOnePlace(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Place> {
        return this.placeService.findOnePlaceById(id);
    }

    @Get()
    async findAllPlace(): Promise<Place[]> {
        return await this.placeService.findAllPlace();
    }

    @Get('/table')
    async findAllPlaceTable() : Promise<TablePlaceDto[]>{
        return await this.placeService.findAllPlaceTable();
    }


    @Post()
    async createPlace(
        @Body() createPlaceDto: CreatePlaceDto
    ): Promise<Place> {
        return await this.placeService.createPlace(createPlaceDto);
    }

    @Patch()
    async deletePlace(
        @Body('id', ParseIntPipe) id: number,
    ): Promise<boolean> {
        return await this.placeService.deletePlaceById(id);
    }
}
