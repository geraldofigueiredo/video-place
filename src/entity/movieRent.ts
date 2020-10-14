import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";
import { Rent } from "./rent.entity";

@Entity('movie_rent')
export class MovieRent {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Movie, movie => movie.myRents, {cascade: true, nullable: false})
    movie: Movie;
    
    @ManyToOne(type => Rent, rent => rent.rentedMovies, { cascade: true, nullable: false})
    rent: Rent;

    @Column({nullable: false})
    quantity: number;
}