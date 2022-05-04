import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto, UpdateBoardDto } from './board.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async list(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async create(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const board: Board = new Board();

    board.user_id = user.id;
    board.title = createBoardDto.title;
    board.content = createBoardDto.content;

    return await this.boardRepository.save(board);
  }

  async get(id: number): Promise<Board> {
    const board: Board = await this.boardRepository.findOneBy({ id });

    if (!board) {
      throw new NotFoundException(`Cannot find board with id ${id}`);
    }

    return board;
  }

  async delete(id: number): Promise<void> {
    await this.boardRepository.delete(id);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const board: Board = await this.get(id);

    board.title = updateBoardDto.title;
    board.content = updateBoardDto.content;

    return await this.boardRepository.save(board);
  }
}
