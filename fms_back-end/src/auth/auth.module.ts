import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret : 'JwtSecret',
      signOptions:{
        expiresIn : 3600,
      }
    })
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
