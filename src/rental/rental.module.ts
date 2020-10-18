import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRental } from 'src/movieRental/movieRental.entity';
import { RentalController } from './rental.controller';
import { Rental } from './rental.entity';
import { RentalService } from "./rental.service";

@Module({
    imports: [TypeOrmModule.forFeature([Rental, MovieRental])],
    controllers: [RentalController],
    providers: [RentalService],
})
export class RentalModule {}
