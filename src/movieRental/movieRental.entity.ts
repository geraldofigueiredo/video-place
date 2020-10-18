import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Rental } from "../rental/rental.entity";
import { Movie } from "../movie/movie.entity";

@Entity('movie_rental')
export class MovieRental {
    @PrimaryColumn({name: 'movie_id', type: 'int', nullable: false})
    movieId: number;

    @ManyToOne(type => Movie, movie => movie.myRents, {cascade: true, nullable: false, primary: true})
    @JoinColumn({name: 'movie_id'})
    movie: Movie;

    @PrimaryColumn({name: 'rental_id', type: 'int', nullable: false})
    rentalId: number;
    
    @ManyToOne(type => Rental, rental => rental.movies, { cascade: true, nullable: false, primary: true})
    @JoinColumn({name: 'rental_id'})
    rental: Rental;

    @Column({nullable: false})
    quantity: number;
}