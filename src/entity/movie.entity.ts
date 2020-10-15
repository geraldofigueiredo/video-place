import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MovieRent } from "./movieRent";

@Entity('movie')
export class Movie {
    constructor(id?: number, title?: string) {
        this.id = id;
        this.title = title;
    }

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

    @Column({name: 'release_date' ,type: 'date', nullable: true})
    releaseDate: Date;

    @Column({type: 'text', nullable: false})
    idiom: string;

    @Column({type: 'boolean', nullable: false})
    subtitled: boolean;

    @Column({type: 'text', nullable: true})
    director: string;

    @Column({name: 'IMDB_link', type: 'text', nullable: true})
    IMDB: string;

    @Column({type: 'int', nullable: false})
    quantity: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', nullable: true})
    upadtedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', nullable: true})
    deletedAt: Date;
}