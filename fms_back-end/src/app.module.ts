import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PlaceModule } from './place/place.module';


@Module({
  imports:[
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    PlaceModule
  ]
})
export class AppModule {}
