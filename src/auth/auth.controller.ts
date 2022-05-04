import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(ValidationPipe) registerUserDto: RegisterUserDto,
  ): Promise<User> {
    return await this.authService.register(registerUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
  ): Promise<string> {
    return await this.authService.login(loginUserDto);
  }
}
