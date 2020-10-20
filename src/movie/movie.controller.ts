import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { MovieDTO } from '../dto/movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(@Inject(MovieService) private movieService: MovieService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getMovies() {
    return this.movieService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async getMovie(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.findOneById(id);
  }

  @Post('/')
  async createMovie(@Body() newMovie: MovieDTO) {
    return this.movieService.insertMovie(newMovie);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/')
  async updateMovie(@Body() movie: MovieDTO) {
    return this.movieService.updateMovie(movie);
  }

  // TODO: remove parameter id and get an id from body
  @Delete('/:id')
  async deleteMovie(@Param('id', ParseIntPipe) id: number) {
    return await this.movieService.deleteMovie(id);
  }
}
