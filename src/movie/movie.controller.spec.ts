import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieDTO } from '../dto/movie.dto';

describe('MovieController', () => {
    let movieController: MovieController;
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [MovieController],
            providers: [{
                provide: MovieService,
                useValue: {
                    findAll: jest.fn().mockResolvedValue([
                        new Movie(1, 'movie 1'),
                        new Movie(2, 'movie 2'),
                        new Movie(3, 'movie 3'),
                        new Movie(4, 'movie 4'),
                    ]),
                    findOneById: jest.fn().mockResolvedValue(new Movie(5, 'movie 5')),
                    insertMovie: jest.fn().mockResolvedValue(new Movie(6, 'movie 6')),
                    updateMovie: jest.fn().mockResolvedValue(new Movie(7, 'updated')),
                    deleteMovie: jest.fn().mockResolvedValue({
                        affected: 1
                    })
                }
            }],
        }).compile();

        movieController = module.get<MovieController>(MovieController);
    });

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('should be defined', () => {
        expect(movieController).toBeDefined();
    });

    describe('getMovies', () => {
        it('should get a list of movies', async () => {
            const allMovies = await movieController.getMovies();
            expect(typeof allMovies).toBe('object');
            expect(allMovies[0].id).toBe(1);
            expect(allMovies.length).toBe(4);
        });
    });

    describe('getMovie', () => {
        it('should return the movie matching id', async () => {
            const movie = await movieController.getMovie(5);
            expect(movie.id).toBe(5);
            expect(movie.title).toBe('movie 5');
        });
    });
    
    describe('createMovie', () => {
        it('should create and return a new movie', async () => {
            const movie = await movieController.createMovie(new MovieDTO());
            expect(movie.id).toBe(6);
            expect(movie.title).toBe('movie 6');
        });
    });
    
    describe('updateMovie', () => {
        it('should update and return a movie', async () => {
            const movie = await movieController.updateMovie(new MovieDTO(7, 'updated'))
            expect(movie.id).toBe(7);
            expect(movie.title).toBe('updated');
        })
    });

    describe('deleteMove', () => {
        it('should delete the movie matching id', async () => {
            const deleted = await movieController.deleteMovie(0)
            expect(deleted.affected).toBe(1);
            expect(typeof deleted).toBe('object');
        })
    });

});
