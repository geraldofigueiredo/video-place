import { MovieRental } from '../movieRental/movieRental.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
<<<<<<< HEAD
=======
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
>>>>>>> release/v1.0.2

@Entity('movie')
export class Movie {
  constructor(id?: number, title?: string) {
    this.id = id;
    this.title = title;
  }

<<<<<<< HEAD
=======
  /**
   * The movie unique identifier
   * @example 1
   */
>>>>>>> release/v1.0.2
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @OneToMany(
    type => MovieRental,
    rentedMovie => rentedMovie.movie,
  )
  rentals: MovieRental[];

<<<<<<< HEAD
=======
  @ApiProperty({ example: 'Fight Club', description: 'The movie title' })
>>>>>>> release/v1.0.2
  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  synopsis: string;

  @Column({ type: 'text', nullable: false })
  genre: string;

  @Column({ name: 'release_date', type: 'date', nullable: true })
  releaseDate: Date;

  @Column({ type: 'text', nullable: false })
  idiom: string;

  @Column({ type: 'boolean', nullable: false })
  subtitled: boolean;

  @Column({ type: 'text', nullable: true })
  director: string;

  @Column({ name: 'IMDB_link', type: 'text', nullable: true })
  IMDB: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Exclude()
  @Column({ name: 'available_quantity', type: 'int', nullable: false })
  availableQuantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  upadtedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
