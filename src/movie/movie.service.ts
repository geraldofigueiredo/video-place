import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { MovieDTO } from '../dto/movie.dto';
import { DeleteResult, In, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { MovieRental } from 'src/movieRental/movieRental.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie) private movieRepository: Repository<Movie>
    ){}

    async findAll(): Promise<Movie[]> {
        return this.movieRepository.find()
    }

    async findOneById(id: number): Promise<Movie> {
        return this.movieRepository.findOne({where: {id: id}});
    }

    async findById(ids: number[]): Promise<Movie[]> {
        return this.movieRepository.find({where: {id: In(ids)}});
    }

    async insertMovie(movieDTO: MovieDTO): Promise<Movie> {
        const newMovie = plainToClass(Movie, movieDTO);
        newMovie.availableQuantity = newMovie.quantity;
        await this.movieRepository.save(newMovie);
        return newMovie;
    }

    async updateMovie(movieDTO: MovieDTO): Promise<Movie> {
        const { id } = movieDTO;
        const updatedMovie = plainToClass(Movie, movieDTO);
        const oldMovie = await this.findOneById(id);

        const quantityDiffInterval = updatedMovie.quantity - oldMovie.quantity;
        updatedMovie.availableQuantity += quantityDiffInterval;
        
        await this.movieRepository.update({id}, updatedMovie);
        return this.findOneById(id);
    }

    async deleteMovie(id: number): Promise<DeleteResult> {
        return await this.movieRepository.delete({id: id});
    }

    async rentMovies(movies: MovieRental[]) {
        for (const [idx, movieRental] of movies.entries()) {
            const movie = await this.findOneById(movieRental.movieId);
            movie.availableQuantity -= movieRental.quantity;
            await this.movieRepository.update({id: movieRental.movieId}, movie);
        }
    }

    async devolveMovies(movies: MovieRental[]) {
        for (const [idx, movieRental] of movies.entries()) {
            const movie = await this.findOneById(movieRental.movieId);
            movie.availableQuantity += movieRental.quantity;
            await this.movieRepository.update({id: movieRental.movieId}, movie);
        }
    }

    async checkAvailability(rental: MovieRental[]) {
        for (const [idx, movieRental] of rental.entries()) {
            const movie = await this.findOneById(movieRental.movieId);
            if (movie === undefined) {
                throw new BadRequestException(`movies.[${idx}] does not exist`);
            }
            if (movieRental.quantity > movie.availableQuantity) {
                throw new BadRequestException(`movies.[${idx}] does not have this requested quantity available`);
            }
        }
    }
}
