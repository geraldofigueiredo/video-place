import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DevolveRentalDTO } from '../dto/devolveRental.dto';
import { MovieRentalDTO, RentalDTO } from '../dto/rental.dto';
import { MovieService } from '../movie/movie.service';
import { MovieRental } from '../movieRental/movieRental.entity';
import { Rental } from './rental.entity';
import { RentalService } from './rental.service';

describe('RentalService', () => {
  let module: TestingModule;
  let rentalService: RentalService;
  let rental: Rental;
  let movies: MovieRental[];

  movies = [
    new MovieRental(0, 1),
    new MovieRental(1, 1),
    new MovieRental(2, 1),
    new MovieRental(3, 1),
  ];
  rental = new Rental(1, movies);

  let moviesDTO = [new MovieRentalDTO(1), new MovieRentalDTO(2)];
  let rentalDTO = new RentalDTO(moviesDTO);

  let moviesDuplicate = [new MovieRentalDTO(1), new MovieRentalDTO(1)];
  const rentalDuplicateMovies = new RentalDTO(moviesDuplicate);

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [
        RentalService,
        {
          provide: MovieService,
          useValue: {
            checkAvailability: jest.fn(),
            rentMovies: jest.fn(),
            devolveMovies: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Rental),
          useValue: {
            find: jest.fn().mockResolvedValue([rental, rental]),
            findOne: jest.fn().mockImplementation(id => {
              switch (id) {
                case 0:
                  return undefined;

                default:
                  return rental;
              }
            }),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    rentalService = module.get<RentalService>(RentalService);
  });

  it('should be defined', () => {
    expect(rentalService).toBeDefined();
  });

  describe('findAll', () => {
    it('should be return a rental array', async () => {
      const findAllReturn = await rentalService.findAll();
      expect(findAllReturn.length).toBe(2);
      expect(findAllReturn).toStrictEqual([rental, rental]);
    });
  });

  describe('findOneById', () => {
    it('should be return a rental', async () => {
      const findOneByIdReturn = await rentalService.findOneById(1);
      expect(typeof findOneByIdReturn).toBe('object');
      expect(findOneByIdReturn).toStrictEqual(rental);
    });
  });

  describe('createRental', () => {
    it('duplicate movies: throw BadRequestException', async () => {
      await expect(
        rentalService.createRental(rentalDuplicateMovies),
      ).rejects.toThrow('movieId: 1, has duplicated in requested movies');
    });
    it('success create rental', async () => {
      const createRentalReturn = await rentalService.createRental(rentalDTO);
      expect(typeof createRentalReturn).toBe('object');
      expect(createRentalReturn).toStrictEqual(rental);
    });
  });

  describe('devolveRental', () => {
    it('undefined rental: throw BadRequestException', async () => {
      await expect(
        rentalService.devolveRental(new DevolveRentalDTO(0)),
      ).rejects.toThrow('rental does not exist or has already been returned');
    });
    it('shoud be return a rental devolved', async () => {
      const devolveRentalReturn = await rentalService.devolveRental(
        new DevolveRentalDTO(1),
      );
      expect(typeof devolveRentalReturn).toBe('object');
      expect(devolveRentalReturn).toStrictEqual(rental);
    });
  });
});
