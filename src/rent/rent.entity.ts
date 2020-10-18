import { MovieRent } from "../movieRent/movieRent.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('rent')
export class Rent {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number

    @OneToMany(type => MovieRent, movieToRent => movieToRent.rent)
    rentedMovies: MovieRent[];

    @Column({name: 'return_period', type: 'int', nullable: false})
    returnPeriod: number;

    @Column({type: 'text', nullable: false})
    locator: string;

    @Column({name: 'return_date', type: 'date', nullable: true})
    returnDate: Date;

    @Column({name: 'rental_date', type: 'date', nullable: false})
    rentalDate: Date;

    @CreateDateColumn({name: 'created_at', type: 'timestamp', nullable: false})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', nullable: true})
    upadtedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', nullable: true})
    deletedAt: Date;
}