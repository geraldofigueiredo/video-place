import { Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
    constructor(
        @Inject(MovieService) private movieService: MovieService
    ) {}

    @Get('/')
    getMovies(): Promise<Movie[]> {
        return this.movieService.findAll()
    }

    @Get('/:id')
    getMovie(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
        return this.movieService.find(id)
    }

    @Post('/')
    createMovie(): Movie {
        return undefined;
    }
}
