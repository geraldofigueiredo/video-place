import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { classToClass, classToPlain } from 'class-transformer';
import { MovieDTO } from '../dto/movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

let movieArray = [
    new Movie(0, 'movie 0'),
    new Movie(1, 'movie 1'),
    new Movie(2, 'movie 2'),
    new Movie(3, 'movie 3'),
    new Movie(4, 'movie 4'),
    new Movie(5, 'movie 5'),
];

describe('MovieService', () => {
    let module: TestingModule;
    let movieService: MovieService;
    // let movieRepository: Repository<Movie>;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                MovieService,
                {
                    provide: getRepositoryToken(Movie),
                    useValue: {
                        find: jest.fn().mockResolvedValue(movieArray),
                        findOne: jest.fn().mockResolvedValue(movieArray[0]),
                        save: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn().mockResolvedValue(movieArray[2])
                    }
                }
            ],
        }).compile();

        movieService = module.get<MovieService>(MovieService);
        // movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    });

    afterEach(() => {
        jest.resetAllMocks();
     });

    it('should be defined', () => {
        expect(movieService).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an movie array', async () => {
            const movies = await movieService.findAll();
            expect(movies.length).toBe(6);
            expect(movies[0]).toBe(movieArray[0]);
            expect(movies[1].id).toBe(movieArray[1].id);
        });
    });

    describe('findById', () => {
        it('should return a single movie', async () => {
            const movie = await movieService.findById(0);
            expect(movie).toBe(movieArray[0]);
        })
    });

    describe('insertMovie', () => {
        it('should insert a new movie', async () => {
            const movie = await movieService.insertMovie(new MovieDTO(1, 'movie 1'));
            expect(movie).toStrictEqual(movieArray[1]);
        });
    });

    describe('updateMovie', () => {
        it('should update and return a movie', async () => {
            const movie = await movieService.updateMovie(new MovieDTO)
            expect(movie).toBe(movieArray[0]);
        });
    });
});