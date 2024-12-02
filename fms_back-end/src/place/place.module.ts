import { forwardRef, Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceRespository } from './place.repository';
import { Place } from './place.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AdminPlaceModule } from 'src/admin-place/admin-place.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    forwardRef(()=>AuthModule),
    forwardRef(()=>AdminPlaceModule),
  ],
  controllers: [PlaceController],
  providers: [
    PlaceService, 
    PlaceRespository,
  ],
  exports : [PlaceService,PlaceRespository],
})
export class PlaceModule { }
