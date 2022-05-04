import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, RegisterUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, name, password, passwordConfirm } = registerUserDto;
    const user = new User();

    if ((await this.userRepository.countBy({ email })) > 0) {
      throw new ConflictException(['The email is exists']);
    }

    if (password !== passwordConfirm) {
      throw new BadRequestException([
        'Password and PasswordConfirm must be the same',
      ]);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    user.email = email;
    user.name = name;
    user.password = hashedPassword;

    return await this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOneBy({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
