import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Rental } from '../rental/rental.entity';
import { Movie } from '../movie/movie.entity';
import { Exclude } from 'class-transformer';

@Entity('movie_rental')
export class MovieRental {
  constructor(movieid?: number, rentalid?: number) {
    this.movieId = movieid;
    this.rentalId = rentalid;
  }

  @Exclude()
  @PrimaryColumn({
    name: 'movie_id',
    type: 'int',
    nullable: false,
    select: false,
  })
  movieId: number;

  @ManyToOne(
    () => Movie,
    movie => movie.rentals,
    { nullable: false },
  )
  @JoinColumn({
    name: 'movie_id',
    referencedColumnName: 'id',
  })
  movie: Movie;

  @Exclude()
  @PrimaryColumn({
    name: 'rental_id',
    type: 'int',
    nullable: false,
    select: false,
  })
  rentalId: number;

  @ManyToOne(
    type => Rental,
    rental => rental.movies,
    { nullable: false, primary: true },
  )
  @JoinColumn({ name: 'rental_id' })
  rental: Rental;

  @Column({ nullable: false })
  quantity: number;
}
