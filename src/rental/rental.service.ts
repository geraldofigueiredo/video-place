import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { classToPlain, plainToClass } from "class-transformer";
import { max } from "class-validator";
import { RentalDTO } from "src/dto/rental.dto";
import { MovieService } from "src/movie/movie.service";
import { Repository } from "typeorm";
import { Rental } from "./rental.entity";

@Injectable()
export class RentalService {
    constructor(
        @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
        @Inject(MovieService) private movieService: MovieService
    ){}

    async findAll(): Promise<Rental[]> {
        return this.rentalRepository.find({where: {returnDate: null}, relations: ['movies', 'movies.movie']});
    }

    async findOneById(rentalId: number): Promise<Rental> {
        return this.rentalRepository.findOne(rentalId,{relations: ['movies', 'movies.movie']});
    }

    async expiredRentals(): Promise<any> {
        const rentalsObject = await this.rentalRepository.find({where: {returnDate: null}, relations: ['movies', 'movies.movie']});
        let rentals = classToPlain(rentalsObject);
        let expiredRentals = [];
        for(const [idx, rental] of rentals.entries()) {
            let daysOverdue = this.calculateDaysOverdue(new Date(rental.rentalDate), rental.returnPeriod);
            
            if (daysOverdue != 0) {
                rental.daysOverdue = daysOverdue;
                expiredRentals.push(rental);
            }
        }
        return expiredRentals;
    }

    calculateDaysOverdue(rentalDate: Date, returnPeriod: number) {
        const now = new Date();
        let devolveLimitDate = new Date();
        devolveLimitDate.setDate(rentalDate.getDate() + returnPeriod + 1);
        let daysOverdue = now.getDate() - devolveLimitDate.getDate();
        return Math.max(daysOverdue, 0);
    }

    async createRental(rentalDTO: RentalDTO): Promise<Rental> {
        const rental = plainToClass(Rental, rentalDTO);
        if (rental.rentalDate === undefined) {
            rental.rentalDate = new Date();
        }
        await this.movieService.checkAvailability(rental.movies);
        await this.movieService.rentMovies(rental.movies);
        await this.rentalRepository.save(rental);
        return this.findOneById(rental.id);
    }
}