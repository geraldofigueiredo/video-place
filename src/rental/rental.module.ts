import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movie/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { MovieRental } from 'src/movieRental/movieRental.entity';
import { RentalController } from './rental.controller';
import { Rental } from './rental.entity';
import { RentalService } from "./rental.service";

@Module({
    imports: [TypeOrmModule.forFeature([Rental, MovieRental, Movie])],
    controllers: [RentalController],
    providers: [RentalService, MovieService],
})
export class RentalModule {}
