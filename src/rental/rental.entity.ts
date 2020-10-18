import { MovieRental } from "../movieRental/movieRental.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity('rental')
export class Rental {
    @PrimaryGeneratedColumn({type: 'int'})
    id: number

    @OneToMany(() => MovieRental, movieRental => movieRental.rental, {cascade: true})
    movies: MovieRental[];

    @Column({name: 'return_period', type: 'int', nullable: false})
    returnPeriod: number;

    @Column({type: 'text', nullable: false})
    locator: string;

    @Column({name: 'return_date', type: 'date', nullable: true})
    returnDate: Date;

    @Column({name: 'rental_date', type: 'date', nullable: false})
    rentalDate: Date;

    @Exclude()
    @CreateDateColumn({name: 'created_at', type: 'timestamp', nullable: false})
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({name: 'updated_at', nullable: true})
    upadtedAt: Date;

    @Exclude()
    @DeleteDateColumn({name: 'deleted_at', nullable: true})
    deletedAt: Date;
}