import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { classToPlain, plainToClass } from "class-transformer";
import { DevolveRentalDTO } from "../dto/devolveRental.dto";
import { MovieRentalDTO, RentalDTO } from "../dto/rental.dto";
import { MovieService } from "../movie/movie.service";
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

    async createRental(rentalDTO: RentalDTO): Promise<Rental> {
        const rental = plainToClass(Rental, rentalDTO);
        if (rental.rentalDate === undefined) {
            rental.rentalDate = new Date();
        }
        this.validateMovieArray(rentalDTO.movies);
        await this.movieService.checkAvailability(rental.movies);
        await this.movieService.rentMovies(rental.movies);
        await this.rentalRepository.save(rental);
        return this.findOneById(rental.id);
    }

    private validateMovieArray(movies: MovieRentalDTO[]) {
        const lookup = movies.reduce((a, e) => {
            a[e.movieId] = ++a[e.movieId] || 0;
            return a;
        }, {});
        const duplicateMovies = movies.filter(e => lookup[e.movieId]);
        if (duplicateMovies.length > 0) {
            throw new BadRequestException(`movieId: ${duplicateMovies[0].movieId}, has duplicated in requested movies`);
        }
    }

    async devolveRental(devolveRentalDTO: DevolveRentalDTO): Promise<Rental> {
        const rental = await this.rentalRepository.findOne(devolveRentalDTO.id, {where: {returnDate: null}, relations: ['movies', 'movies.movie']});
        if (rental === undefined) {
            throw new BadRequestException('rental does not exist or has already been returned');
        }
        if (devolveRentalDTO.returnDate === undefined) {
            devolveRentalDTO.returnDate = new Date().toDateString();
        }
        await this.movieService.devolveMovies(rental.movies);
        await this.rentalRepository.update({id: rental.id}, devolveRentalDTO);
        return this.findOneById(devolveRentalDTO.id);
    }

    async expiredRentals(): Promise<any[]> {
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

    private calculateDaysOverdue(rentalDate: Date, returnPeriod: number) {
        const now = new Date();
        let devolveLimitDate = new Date();
        devolveLimitDate.setDate(rentalDate.getDate() + returnPeriod + 1);
        let daysOverdue = now.getDate() - devolveLimitDate.getDate();
        return Math.max(daysOverdue, 0);
    }
}