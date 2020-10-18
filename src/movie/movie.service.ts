import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { MovieDTO } from '../dto/movie.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie) private movieRepository: Repository<Movie>
    ){}

    async findAll(): Promise<Movie[]> {
        return this.movieRepository.find()
    }

    async findById(id: number): Promise<Movie> {
        return this.movieRepository.findOne({where: {id: id}});
    }

    async insertMovie(movieDTO: MovieDTO): Promise<Movie> {
        const newMovie = plainToClass(Movie, movieDTO);
        await this.movieRepository.save(newMovie);
        return newMovie;
    }

    async updateMovie(movieDTO: MovieDTO): Promise<Movie> {
        const { id } = movieDTO;
        const updatedMovie = plainToClass(Movie, movieDTO);
        await this.movieRepository.update({id}, updatedMovie);
        return this.findById(id);
    }

    async deleteMovie(id: number): Promise<DeleteResult> {
        return await this.movieRepository.delete({id: id});
    }
}
