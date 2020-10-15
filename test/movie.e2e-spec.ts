import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieService } from "src/service/movie.service";
import supertest from "supertest";
import { MovieModule } from "../src/module/movie.module";

describe('movieController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                MovieModule,
                TypeOrmModule.forRoot({name: 'test'})
            ],
            providers: [MovieService]
        }).compile();

        app = module.createNestApplication();
        await app.init();
    })
    
    it('should return an empty array os movies', async () => {
        const { body } = await supertest.agent(app.getHttpServer())
            .get('/movie')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body).toEqual([]);
    })
    
    // afterEach(async () => {
    //     await MovieModule.query(`DELETE FROM movie;`);
    // });
    
    afterAll(async () => {
        await app.close();
    });
})


