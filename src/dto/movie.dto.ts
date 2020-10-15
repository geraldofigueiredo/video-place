export class MovieDTO {
    title: string;
    synopsis: string;
    genre: string;
    releaseDate: Date;
    idiom: string;
    subtitled: boolean;
    director: string;
    IMDB: string;
    quantity: number;

    constructor(
        title: string,
        synopsis: string,
        genre: string,
        idiom: string,
        subtitled: boolean,
        quantity: number,
        releaseDate?: Date,
        director?: string,
        IMDB?: string,
    ){
        this.title = title;
        this.synopsis = synopsis;
        this.genre = genre;
        this.idiom = idiom;
        this.subtitled = subtitled;
        this.quantity = quantity;
        this.releaseDate = releaseDate;
        this.director = director;
        this.IMDB = IMDB;
    }
}