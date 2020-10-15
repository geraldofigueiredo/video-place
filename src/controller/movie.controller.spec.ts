import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from '../entity/movie.entity';
import { MovieService } from '../service/movie.service';
import { MovieController } from './movie.controller';

jest.mock('../service/movie.service')

describe('MovieController', () => {
    let movieController: MovieController;
    let movieService: MovieService;
    let module: TestingModule;
    let movies: Movie[];
    let movie: Movie;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [MovieController],
            providers: [MovieService],
        }).compile();

        movieController = module.get<MovieController>(MovieController);
        movieService = module.get<MovieService>(MovieService);

        movies = new Array(
            new Movie(1, 'movie 1'),
            new Movie(2, 'movie 2')
        );

        movie = new Movie(99, 'movie 99');
    });

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('should be defined', () => {
        expect(movieController).toBeDefined();
    });

    it('should return an movie array if successful', async () => {
        jest.spyOn(movieService, 'findAll').mockResolvedValue(movies)
        expect(await movieController.getMovies()).toBe(movies);
    });

    
    it('should return a movie if successful', async () => {
        jest.spyOn(movieService, 'find').mockResolvedValue(movie);
        expect(await movieController.getMovie(1)).toBe(movie);
    });
});
