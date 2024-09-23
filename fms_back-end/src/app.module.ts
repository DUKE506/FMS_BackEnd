import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports:[
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule
  ]
})
export class AppModule {}
