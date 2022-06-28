import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateBoardDto, UpdateBoardDto } from './board.dto';
import { Board } from './board.entity';
import { BoardsService } from './board.service';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private readonly logger = new Logger('BoardsController');
  constructor(private readonly boardsService: BoardsService) { }

  @Get()
  async list(): Promise<Board[]> {
    this.logger.verbose(`User trying to get all boards`);
    return await this.boardsService.list();
  }

  @Post()
  async create(
    @Body(ValidationPipe) createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.name} creating a new board. Payload: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return await this.boardsService.create(createBoardDto, user);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return await this.boardsService.get(id);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.boardsService.delete(id, user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return await this.boardsService.update(id, updateBoardDto);
  }
}
