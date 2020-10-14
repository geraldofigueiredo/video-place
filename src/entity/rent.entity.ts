import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MovieRent } from "./movieRent";

@Entity('rent')
export class Rent {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number

    @OneToMany(type => MovieRent, movieToRent => movieToRent.rent)
    rentedMovies: MovieRent[];

    @Column({name: 'rental_date', type: 'timestamp', nullable: false, default: 'now()'})
    rentalDate: Date;

    @Column({name: 'return_period', type: 'int', nullable: false})
    returnPeriod: number;

    @Column({type: 'text', nullable: false})
    locator: string;

    @Column({name: 'return_date', type: 'timestamp'})
    returnDate: Date;

    @UpdateDateColumn({name: 'updated_at'})
    upadtedAt: Date;

    @UpdateDateColumn({name: 'deleted_at'})
    deletedAt: Date;
}