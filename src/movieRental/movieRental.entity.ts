import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rental } from "../rental/rental.entity";
import { Movie } from "../movie/movie.entity";

@Entity('movie_rental')
export class MovieRental {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Movie, movie => movie.myRents, {cascade: true, nullable: false})
    movie: Movie;
    
    @ManyToOne(type => Rental, rental => rental.rentedMovies, { cascade: true, nullable: false})
    rent: Rental;

    @Column({nullable: false})
    quantity: number;
}