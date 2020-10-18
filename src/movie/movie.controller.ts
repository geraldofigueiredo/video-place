import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MovieDTO } from '../dto/movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
    constructor(
        @Inject(MovieService) private movieService: MovieService
    ) {}

    @Get('/')
    async getMovies(): Promise<Movie[]> {
        return this.movieService.findAll();
    }

    @Get('/:id')
    async getMovie(@Param('id', ParseIntPipe) id: number): Promise<Movie>{
        return this.movieService.findById(id);
    }

    @Post('/')
    async createMovie(@Body() newMovie: MovieDTO): Promise<Movie> {
        return this.movieService.insertMovie(newMovie);
    }

    @Put('/')
    async updateMovie(@Body() movie: MovieDTO){
        return this.movieService.updateMovie(movie);
    }

    @Delete('/:id')
    async deleteMovie(@Param('id', ParseIntPipe) id: number) {
        return await this.movieService.deleteMovie(id);
    }
}
