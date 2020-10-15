import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from '../service/movie.service';
import { MovieController } from '../controller/movie.controller';
import { Movie } from '../entity/movie.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
    controllers: [
        MovieController, ],
    providers: [
        MovieService, ],
})
export class MovieModule {}
