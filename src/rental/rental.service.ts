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
        @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
        @InjectRepository(MovieRental) private movieRentalRepository: Repository<MovieRental>
    ){}

    async getRentals(): Promise<Rental[]> {
        return this.rentalRepository.find({relations: ['movies', 'movies.movie']});
    }

    async createRental(rentalDTO: RentalDTO): Promise<Rental> {
        const rental = plainToClass(Rental, rentalDTO);
        rental.rentalDate = new Date();
        await this.rentalRepository.save(rental);
        return rental;
    }
}