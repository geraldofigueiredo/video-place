import { Exclude, Expose } from 'class-transformer';
import { IsISO8601, IsOptional, IsPositive, Min } from 'class-validator';

@Exclude()
export class DevolveRentalDTO {
  constructor(id?: number) {
    this.id = id;
  }

  @Expose()
  @IsPositive()
  @Min(1)
  id: number;

  @Expose()
  @IsISO8601({ strict: true })
  @IsOptional()
  returnDate: string;
}
