import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AdminPlaceModule } from 'src/admin-place/admin-place.module';
import { PlaceModule } from 'src/place/place.module';
import { GroupModule } from 'src/group/group.module';
import { User } from './user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret : 'JwtSecret',
      signOptions:{
        expiresIn : 3600,
      }
    }),
    forwardRef(()=>AdminPlaceModule),
    forwardRef(()=>GroupModule),
    forwardRef(()=>PlaceModule),
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy
  ],
  exports: [
    AuthService,
    TypeOrmModule.forFeature([User]),
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
