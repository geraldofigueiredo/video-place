import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { rejects } from 'assert';
import { Repository } from 'typeorm';
import { Movie } from '../movie.entity';
import { MovieService } from '../movie.service';

describe('MovieService', () => {
    let movieService: MovieService;
    let module: TestingModule;
    let movieRepositoryMock: Repository<Movie>;
    const mockNumberToSatisfyParameters = 0;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MovieService,
                {
                    provide: getRepositoryToken(Movie),
                    useValue: {
                        findOne: jest.fn(),
                        find: jest.fn(),
                        update: jest.fn(),
                        save: jest.fn()
                    }
                }
            ],
        }).compile();

        movieService = module.get<MovieService>(MovieService);
        movieRepositoryMock = module.get(getRepositoryToken(Movie));
    });

    it('should be defined', () => {
        expect(movieService).toBeDefined();
    });

    it('should return a movie if successful', async () => {
        const movie = new Movie();
        jest.spyOn(movieRepositoryMock, 'findOne').mockResolvedValue(movie);
        expect(await movieService.find(mockNumberToSatisfyParameters)).toBe(movie);
    })
});