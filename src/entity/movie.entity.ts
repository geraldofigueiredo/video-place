import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MovieRent } from "./movieRent";

@Entity('movie')
export class Movie {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @OneToMany(type => MovieRent, rentedMovie => rentedMovie.movie)
    myRents: MovieRent[];

    @Column({type: 'text', nullable: false})
    title: string;

    @Column({type: 'text', nullable: false})
    synopsis: string;

    @Column({type: 'text', nullable: false})
    genre: string;

    @Column({name: 'release_date' ,type: 'date'})
    releaseDate: Date;

    @Column({type: 'text', nullable: false})
    idiom: string;

    @Column({type: 'boolean', nullable: false})
    subtitled: boolean;

    @Column({type: 'text'})
    director: string;

    @Column({name: 'IMDB_link', type: 'text'})
    IMDB: string;

    @Column({type: 'int', nullable: false})
    quantity: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    upadtedAt: Date;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: Date;
}