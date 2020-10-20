import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsFQDN,
  IsISO8601,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

@Exclude()
export class MovieDTO {
  constructor(id?: number, title?: string) {
    this.id = id;
    this.title = title;
  }

  @Expose()
  @IsPositive()
  @Min(1)
  @IsOptional()
  id: number;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  synopsis: string;

  @Expose()
  @IsString()
  genre: string;

  @Expose()
  @IsISO8601({ strict: true })
  @IsOptional()
  releaseDate: string;

  @Expose()
  @IsString()
  idiom: string;

  @Expose()
  @IsBoolean()
  subtitled: boolean;

  @Expose()
  @IsPositive()
  @Min(1)
  quantity: number;

  @Expose()
  @IsString()
  @IsOptional()
  director: string;

  @Expose()
  @IsFQDN()
  @IsOptional()
  IMDB: string;
}
