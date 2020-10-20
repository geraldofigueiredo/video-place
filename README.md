<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
  
 <p align="center">implementation of an API for a practical development test using nestjs.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Dependencies

- Nodejs
- Postgres

## Installation
- install the dependencies above the way you prefer and run the commands bellow to clone the repositorie and install the node packages necessaries to run the app.

```bash
$ git clone https://github.com/geraldofigueiredo/video-place.git && cd video-place
$ npm install
```

## Running the app

- Create a database called "video_place" on your running postgres.

using PSQL:
```
$ sudo su - postgres
$ psql
$ CREATE DATABASE video_place;
```

- Create the ormconfig.json file on your project root (use the "ormconfig.example.json" as a template for configuring your database connection), example:
```json
// ormconfig.json
{
    "type": "postgres",
    "host": "postgres",
    "port": 5432,
    "username": "username",
    "password": "password",
    "database": "video_place",
    "entities": [
        "dist/entity/*.js"
    ],
    "migrations": [
        "dist/migrations/*.js"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migrations"
    },
    "synchronize": true
}
```


Running the app you gonna create your app schema.
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
