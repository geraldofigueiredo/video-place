import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DevolveRentalDTO } from '../dto/devolveRental.dto';
import { MovieRentalDTO, RentalDTO } from '../dto/rental.dto';
import { MovieRental } from '../movieRental/movieRental.entity';
import { RentalController } from './rental.controller';
import { Rental } from './rental.entity';
import { RentalService } from './rental.service';

describe('RentalController', () => {
  let rentalController: RentalController;
  let module: TestingModule;
  let rental: Rental;
  let movies: MovieRental[];

  beforeEach(async () => {
    movies = [
      new MovieRental(1, 1),
      new MovieRental(2, 1),
      new MovieRental(3, 1),
      new MovieRental(4, 1),
    ];
    rental = new Rental(1, movies);

    module = await Test.createTestingModule({
      controllers: [RentalController],
      providers: [
        {
          provide: RentalService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([rental, rental]),
            expiredRentals: jest.fn().mockResolvedValue([rental]),
            createRental: jest.fn().mockResolvedValue(rental),
            devolveRental: jest.fn().mockResolvedValue(rental),
          },
        },
      ],
    }).compile();

    rentalController = module.get<RentalController>(RentalController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(rentalController).toBeDefined();
  });

  describe('getRentals', () => {
    it('should get a list of rentals', async () => {
      const allRentals = await rentalController.getRentals();
      expect(typeof allRentals).toBe('object');
      expect(allRentals.length).toEqual(2);
    });
  });

  describe('expiredRentals', () => {
    it('should get a list of expired rentals', async () => {
      const expiredRentals = await rentalController.getExpiredRentals();
      expect(typeof expiredRentals).toBe('object');
      expect(expiredRentals.length).toBe(1);
    });
  });

  describe('rentMovies', () => {
    const rentalDtoMoviesUndefined = new RentalDTO();

    const rentalDtoMoviesEmpty = new RentalDTO();
    rentalDtoMoviesEmpty.movies = [];

    const rentalDtosuccess = new RentalDTO();
    rentalDtosuccess.movies = [new MovieRentalDTO()];

    it('should throw a bad request exception: movies arrays not defined', async () => {
      await expect(
        rentalController.rentMovies(rentalDtoMoviesUndefined),
      ).rejects.toEqual(
        new BadRequestException('movies array must be defined'),
      );
    });

    it('should throw a bad request exception: movies arrays must be not empty', async () => {
      await expect(
        rentalController.rentMovies(rentalDtoMoviesEmpty),
      ).rejects.toEqual(
        new BadRequestException('movies array must be not empty'),
      );
    });

    it('should return the created rental', async () => {
      const rentalReturn = await rentalController.rentMovies(rentalDtosuccess);
      expect(typeof rental).toBe('object');
      expect(rentalReturn).toBe(rental);
    });
  });

  describe('devolveRental', () => {
    it('should return the devolved rental', async () => {
      const devolvedRental = await rentalController.devolveRental(
        new DevolveRentalDTO(),
      );
      expect(typeof devolvedRental).toBe('object');
      expect(devolvedRental).toBe(rental);
    });
  });
});
