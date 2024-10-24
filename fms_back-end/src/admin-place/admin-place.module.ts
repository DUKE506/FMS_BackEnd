import { Module } from '@nestjs/common';
import { AdminPlaceController } from './admin-place.controller';
import { AdminPlaceService } from './admin-place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPlaceRepository } from './admin-place.repositoy';
import { AuthService } from 'src/auth/auth.service';
import { PlaceService } from 'src/place/place.service';
import { AuthModule } from 'src/auth/auth.module';
import { PlaceModule } from 'src/place/place.module';

@Module({
  imports:[
    AuthModule,
    PlaceModule,
    TypeOrmModule.forFeature([AdminPlaceRepository])
  ],
  controllers: [AdminPlaceController],
  providers: [
    AdminPlaceService,
    AdminPlaceRepository,]
})
export class AdminPlaceModule {}
