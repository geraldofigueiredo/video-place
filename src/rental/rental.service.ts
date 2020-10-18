import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rental } from "./rental.entity";

@Injectable()
export class RentService {
    constructor(
        @InjectRepository(Rental) private rentRepository: Repository<Rental>
    ){}
}