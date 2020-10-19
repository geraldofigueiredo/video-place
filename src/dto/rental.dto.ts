import { Exclude, Expose, Type } from "class-transformer";
import { IsDefined, IsISO8601, IsNotEmpty, IsOptional, IsPositive, IsString, Min, ValidateNested } from "class-validator";

export class MovieRentalDTO {
    @Expose()
    @IsPositive()
    @Min(1)
    movieId: number;

    @Expose()
    @IsPositive()
    @Min(1)
    quantity: number;
}

@Exclude()
export class RentalDTO {
    
    @Expose()
    @IsDefined()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => MovieRentalDTO)
    movies: MovieRentalDTO[];

    @Expose()
    @IsISO8601({strict: true})
    @IsOptional()
    rentalDate: string;

    @Expose()
    @IsPositive()
    @Min(1)
    returnPeriod: number;

    @Expose()
    @IsString()
    locator: string;
}