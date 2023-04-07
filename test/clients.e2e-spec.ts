import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Clients } from '../src/clients/clients.entity';
import { ClientsModule } from '../src/clients/clients.module';
import { Cars } from '../src/clients/cars/cars.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../src/auth/auth.module';
import { Repository } from 'typeorm';

describe('Clients (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          database: 'autocar_project_test',
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          port: Number(process.env.DB_PORT),
          synchronize: true,
          entities: [Clients, Cars],
        }),
        ClientsModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Testing post route - Create client', () => {
    let user = {
      name: 'Usuario teste',
      cpf_cnpj: '297.337.900-87',
      client_type: 'malu',
      birthday: '21/09/2003',
      phone: '11951202163',
      email: 'teste3@gmail.com',
      password: 'gege122',
      confirmPassword: 'gege122',
      zipcode: '06266-190',
      street: 'Rua pietro clissa',
      number: '116',
      neighbourhood: 'Jardim Bonança',
      city: 'Osasco',
      skip: 1,
    };

    it('It should create a client user and return it in the response', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/clients')
        .send(user)
        .expect(201);

      expect(response.body.name).toEqual(user.name);
      expect(response.body.cpf_cnpj).toEqual(user.cpf_cnpj);
      expect(response.body.client_type).toEqual(user.client_type);
      expect(response.body.birthday).toEqual(user.birthday);
      expect(response.body.phone).toEqual(user.phone);
      expect(response.body.email).toEqual(user.email);
      expect(response.body.password).toBeUndefined();
      expect(response.body.confirmPassword).toBeUndefined();
      expect(response.body.zipcode).toEqual(user.zipcode);
      expect(response.body.street).toEqual(user.street);
      expect(response.body.number).toEqual(user.number);
      expect(response.body.neighbourhood).toEqual(user.neighbourhood);
      expect(response.body.city).toEqual(user.city);
    });
  });

  it('get', () => {
    return request(app.getHttpServer())
      .get('/api/v1/clients')
      .expect(200)
      .then((data) => {
        console.log(data);
      });
  });

  afterAll(async () => {
    const clientsRepository = moduleFixture.get<Repository<Clients>>(
      getRepositoryToken(Clients),
    );
    await clientsRepository
      .createQueryBuilder()
      .delete()
      .from(Clients)
      .execute();
  });
});
