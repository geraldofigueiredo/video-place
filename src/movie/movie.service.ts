import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie) private movieRepository: Repository<Movie>
    ){}

    findAll(): Promise<Movie[]> {
        return this.movieRepository.find()
    }

    find(id: number): Promise<Movie> {
        return this.movieRepository.findOne({where: {id: id}})
    }
}
