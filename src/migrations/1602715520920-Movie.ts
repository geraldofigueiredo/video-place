import {MigrationInterface, QueryRunner} from "typeorm";

export class Movie1602715520920 implements MigrationInterface {
    name = 'Movie1602715520920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rent" ("id" BIGSERIAL NOT NULL, "return_period" integer NOT NULL, "locator" text NOT NULL, "return_date" TIMESTAMP, "rental_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_211f726fd8264e82ff7a2b86ce2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_rent" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "movieId" bigint NOT NULL, "rentId" bigint NOT NULL, CONSTRAINT "PK_0d97199759e16ecf213674ddbb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" BIGSERIAL NOT NULL, "title" text NOT NULL, "synopsis" text NOT NULL, "genre" text NOT NULL, "release_date" date, "idiom" text NOT NULL, "subtitled" boolean NOT NULL, "director" text, "IMDB_link" text, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie_rent" ADD CONSTRAINT "FK_2a148d17c2e9477d259bc4ef59b" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_rent" ADD CONSTRAINT "FK_79c4e4c1b575dafc9f9ab06fecd" FOREIGN KEY ("rentId") REFERENCES "rent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_rent" DROP CONSTRAINT "FK_79c4e4c1b575dafc9f9ab06fecd"`);
        await queryRunner.query(`ALTER TABLE "movie_rent" DROP CONSTRAINT "FK_2a148d17c2e9477d259bc4ef59b"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "movie_rent"`);
        await queryRunner.query(`DROP TABLE "rent"`);
    }

}
