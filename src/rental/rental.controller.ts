import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Put, UseInterceptors } from "@nestjs/common";
import { RentalDTO } from "src/dto/rental.dto";
import { RentalService } from "./rental.service";


@Controller('rental')
export class RentalController {
    constructor(
        @Inject(RentalService) private rentalService: RentalService
    ){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    async getRentals() {
        return this.rentalService.getRentals();
    }

    @Get('/expire')
    async getExpiredRentals() {
        return undefined;
    }

    @Post('/')
    async rentMovie(@Body() rentMovies: RentalDTO) {
        // Array of objects has a bug in Class-Validator
        if (rentMovies.movies.length == 0) {
            throw new BadRequestException('movies array must be not empty');
        }
        return this.rentalService.createRental(rentMovies);
    }

    @Put('/devolve')
    async devolveMovie() {
        return undefined;
    }
}