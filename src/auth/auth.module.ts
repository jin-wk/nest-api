import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from 'src/config/jwt.service';
import { PassportService } from 'src/config/passport.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { User } from './user.entity';

@Module({
  imports: [
    PassportModule.registerAsync({
      useClass: PassportService,
    }),
    JwtModule.registerAsync({
      useClass: JwtService,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
