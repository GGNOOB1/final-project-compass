# Api Auto Car

Last challenge implementing all the technologies studied during the internship. Creating an auto car system to manage customers, mechanics, services, cars and parts.

[Deploy](https://auto-car-project.onrender.com)

## Info

<p align="center">
   <img src="http://img.shields.io/static/v1?label=Typescript&message=4.7.4&color=blue&style=for-the-badge&logo=typescript"/>
   <img src="http://img.shields.io/static/v1?label=postgre&message=15.2&color=orange&style=for-the-badge&logo=postgre"/>
   <img src="http://img.shields.io/static/v1?label=NestJS&message=9.0.0&color=red&style=for-the-badge&logo=nestjs"/>
   <img src="http://img.shields.io/static/v1?label=STATUS&message=FINISHING&color=orange&style=for-the-badge"/>
</p>

## Running Locally

Clone the project

```bash
  git clone https://github.com/GGNOOB1/final-project-compass/tree/week-two
```

Enter the project directory

```bash
  cd my-project
```

Install the dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

## Installation

Install dependencies of api-auto-car with npm

```bash
$ npm install
```

## Environment variables

To run this project, you will need to add the following environment variables to your .env

`JWT_SECRET_KEY=<secret_key>`
`DB_HOST=<localhost>`
`DB_NAME=<database_name>`
`DB_NAME_TEST=autocar_project_test>`
`DB_USERNAME=<db_username>`
`DB_PASSWORD=<password>`
`DB_PORT=<port>`

`SECRET_KEY=<secret_key>`
You will need to replace all <> with your own values

## Docker

To run docker just run the command:

```bash

$ docker-compose-up

```

If necessary, change the values of the variables in docker file

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Resources

- Node.JS v.18.12.1

- Dependencies:

  - @nestjs/common: ^9.0.0,
  - @nestjs/config: ^2.3.1,
  - @nestjs/core: ^9.0.0,
  - @nestjs/jwt: ^10.0.3,
  - @nestjs/mapped-types: ^1.2.2,
  - @nestjs/platform-express: ^9.0.0,
  - @nestjs/swagger: ^6.3.0,
  - @nestjs/typeorm: ^9.0.1,
  - bcrypt: ^5.1.0,
  - class-transformer: ^0.5.1,
  - class-validator: ^0.14.0,
  - cpf-cnpj-validator: ^1.0.3,
  - date-fns: ^2.29.3,
  - moment: ^2.29.4,
  - pg: ^8.10.0,
  - reflect-metadata: ^0.1.13,
  - rxjs: ^7.2.0,
  - typeorm: ^0.3.12

- Development dependencies:
  - dotenv v16.0.,
  - @nestjs/cli": "^9.0.0",
  - @nestjs/schematics": "^9.0.0",
  - @nestjs/testing": "^9.0.0",
  - @types/express": "^4.17.13",
  - @types/jest": "29.2.4",
  - @types/node": "18.11.18",
  - @types/supertest": "^2.0.11",
  - @typescript-eslint/eslint-plugin": "^5.0.0",
  - @typescript-eslint/parser": "^5.0.0",
  - dotenv": "^16.0.3",
  - eslint": "^8.0.1",
  - eslint-config-prettier": "^8.3.0",
  - eslint-plugin-prettier": "^4.0.0",
  - jest": "29.3.1",
  - prettier": "^2.3.2",
  - source-map-support": "^0.5.20",
  - supertest": "^6.1.3",
  - ts-jest": "29.0.3",
  - ts-loader": "^9.2.3",
  - ts-node": "^10.0.0",
  - tsconfig-paths": "4.1.1",
  - typescript": "^4.7.4"

## Requirements

[Node.js](https://nodejs.org/en/)

[Postgre](https://www.postgresql.org/)

[Typescript](https://www.typescriptlang.org/)

##

## Routes

Some routes have authentication, so it will be necessary to put the token when logging into the bearer token in the header

### Swagger

Detailed documentation of each api route

To access the documentation access the route:

- /swagger

obs: Run Postman locally for more efficiency

## Test

```bash

# e2e tests
$ npm run test:e2e

$ npm run test:e2e:watch


```

Copyright :copyright: 2023 - Final project
