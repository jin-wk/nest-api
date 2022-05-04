import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './board/board.module';
import { DatabaseService } from './config/database.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}
