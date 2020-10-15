import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Movie } from '../entity/movie.entity';
import { MovieService } from '../service/movie.service';

@Controller('movie')
export class MovieController {
    constructor(
        @Inject(MovieService) private movieService: MovieService
    ) {}

    @Get()
    getMovies(): Promise<Movie[]> {
        return this.movieService.findAll()
    }

    @Get(':id')
    getMovie(@Param() params): Promise<Movie> {
        return this.movieService.find(params.id)
    }
}
