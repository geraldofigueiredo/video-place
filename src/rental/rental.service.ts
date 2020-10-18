import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { RentalDTO } from "src/dto/rental.dto";
import { MovieRental } from "src/movieRental/movieRental.entity";
import { Repository } from "typeorm";
import { Rental } from "./rental.entity";

@Injectable()
export class RentalService {
    constructor(
        @InjectRepository(Rental) private rentRepository: Repository<Rental>,
        @InjectRepository(MovieRental) private movieRentalRepository: Repository<MovieRental>
    ){}

    async createRental(rentalDTO: RentalDTO): Promise<Rental> {
        const rental = plainToClass(Rental, rentalDTO);
        rental.rentalDate = new Date();
        rental.movies = rentalDTO.movies.map(movie => plainToClass(MovieRental, movie));
        
        await this.rentRepository.save(rental);
        rental.movies.forEach(movie => movie.rentalId = rental.id)
        console.log(rental);
        await this.movieRentalRepository.save(rental.movies);
        return rental;
    }
}