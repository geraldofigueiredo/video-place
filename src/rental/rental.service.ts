import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExecException } from "child_process";
import { classToPlain, plainToClass } from "class-transformer";
import { RentalDTO } from "src/dto/rental.dto";
import { Movie } from "src/movie/movie.entity";
import { MovieService } from "src/movie/movie.service";
import { MovieRental } from "src/movieRental/movieRental.entity";
import { In, Repository } from "typeorm";
import { Rental } from "./rental.entity";

@Injectable()
export class RentalService {
    constructor(
        @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
        @Inject(MovieService) private movieService: MovieService
    ){}

    async findAll(): Promise<Rental[]> {
        return this.rentalRepository.find({relations: ['movies', 'movies.movie']});
    }

    async findOneById(rentalId: number): Promise<Rental> {
        return this.rentalRepository.findOne(rentalId,{relations: ['movies', 'movies.movie']});
    }

    async createRental(rentalDTO: RentalDTO): Promise<Rental> {
        const rental = plainToClass(Rental, rentalDTO);
        rental.rentalDate = new Date();
        await this.movieService.checkAvailability(rental.movies);
        await this.movieService.rentMovies(rental.movies);
        await this.rentalRepository.save(rental);
        return this.findOneById(rental.id);
    }
}