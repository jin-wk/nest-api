import { Injectable } from '@nestjs/common';
import { AuthOptionsFactory, IAuthModuleOptions } from '@nestjs/passport';

@Injectable()
export class PassportService implements AuthOptionsFactory {
  createAuthOptions(): IAuthModuleOptions {
    return {
      defaultStrategy: 'jwt',
    };
  }
}
