import { IsInt, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class UpdateBoardDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
