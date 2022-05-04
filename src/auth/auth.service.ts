import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const user = new User();

    if (
      (await this.userRepository.countBy({ email: registerUserDto.email })) > 0
    ) {
      throw new ConflictException(['The email is exists']);
    }

    if (registerUserDto.password !== registerUserDto.passwordConfirm) {
      throw new BadRequestException([
        'Password and PasswordConfirm must be the same',
      ]);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerUserDto.password, salt);

    user.email = registerUserDto.email;
    user.name = registerUserDto.name;
    user.password = hashedPassword;

    return await this.userRepository.save(user);
  }
}
