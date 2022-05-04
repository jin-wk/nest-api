import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return await this.authService.register(registerUserDto);
  }
}
