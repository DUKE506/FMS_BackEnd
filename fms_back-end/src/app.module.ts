import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PlaceModule } from './place/place.module';
import { AdminPlaceModule } from './admin-place/admin-place.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GroupModule } from './group/group.module';


@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal : true,
      load : [],
      cache : true,
      envFilePath : [
        process.env.NODE_ENV === 'production'
        ? '.production.env'
        : '.env.development',
      ]
    }),
    TypeOrmModule.forRootAsync({
      inject : [ConfigService],
      useFactory : async(configService : ConfigService) => 
        await typeORMConfig(configService),
      }),
    AuthModule,
    PlaceModule,
    AdminPlaceModule,
    GroupModule
  ]
})
export class AppModule {}
