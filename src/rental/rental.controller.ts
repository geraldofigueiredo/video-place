import { Controller, Get, Inject, Post, Put } from "@nestjs/common";
import { Rental } from "./rental.entity";
import { RentService } from "./rental.service";


@Controller('rental')
export class RentalController {
    constructor(
        @Inject(RentService) private rentService: RentService
    ){}

    @Get('/')
    async getRentals() {
        return undefined;
    }

    @Get('/expire')
    async getExpiredRentals() {
        return undefined;
    }

    @Post('/')
    async rentMovie() {
        return undefined;
    }

    @Put('/devolve')
    async devolveMovie() {
        return undefined;
    }
}