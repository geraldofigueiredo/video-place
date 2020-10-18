import { Exclude, Expose, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDefined, IsISO8601, IsNotEmpty, IsNotEmptyObject, IsOptional, IsPositive, IsString, Min, registerDecorator, ValidateNested, ValidationArguments, ValidationOptions } from "class-validator";

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

    // @Expose()
    // @IsISO8601({strict: true})
    // @IsOptional()
    // rentalDate: Date;

    @Expose()
    @IsPositive()
    @Min(1)
    returnPeriod: number;

    @Expose()
    @IsString()
    locator: string;
}