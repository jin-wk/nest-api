import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBoardDto, UpdateBoardDto } from './board.dto';
import { Board } from './board.entity';
import { BoardsService } from './board.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async list(): Promise<Board[]> {
    return await this.boardsService.list();
  }

  @Post()
  async create(
    @Body(ValidationPipe) createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return await this.boardsService.create(createBoardDto);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return await this.boardsService.get(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.boardsService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return await this.boardsService.update(id, updateBoardDto);
  }
}
