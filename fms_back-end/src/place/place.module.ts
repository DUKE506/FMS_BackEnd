import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceRespository } from './place.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceRespository]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRespository],
  exports : [PlaceService],
})
export class PlaceModule { }
