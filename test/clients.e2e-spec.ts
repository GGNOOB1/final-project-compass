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
import { response } from 'express';

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

  describe('Testing clients e cars routes', () => {
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

    let token: string;
    let id: string;
    let carId: string;

    it('It should create a client user and return it in the response', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/clients')
        .send(user)
        .expect(201);
      id = response.body.id;
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
    it('Should throw an unauthorized error for trying to access without token', () => {
      return request(app.getHttpServer()).get('/api/v1/clients').expect(401);
    });

    it('You should log in and receive the valid token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/client/login')
        .send({ email: 'teste3@gmail.com', password: 'gege122' })
        .expect(200);
      token = response.header.authorization;
    });

    it('Must return data from a client', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/clients/' + id)
        .set('Authorization', `${token}`)
        .expect(200);
    });

    it('You should update a customers data', async () => {
      let response = await request(app.getHttpServer())
        .patch('/api/v1/clients/' + id)
        .set('Authorization', `${token}`)
        .send({ client_type: 'normal' })
        .expect(200);
      expect(response.body.client_type).toEqual('normal');
    });

    it('Must be possible to create a car from the customer id', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/clients/' + id + '/cars')
        .set('Authorization', `${token}`)
        .send({
          license_plate: '3fgf532-5fh37-4462-f33c-2c963ffl6aha6',
          model: 'Jeep AMG',
          year: 2022,
          manufacturer: 'Mercedes',
          color: 'Preto',
        })
        .expect(201);

      carId = response.body.carId;
    });

    it('Must be get all cars', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/clients/' + id + '/cars')
        .set('Authorization', `${token}`)
        .send()
        .expect(200);
    });

    it('Must update a car from your customer id and car id', async () => {
      console.log(carId);
      const response = await request(app.getHttpServer())
        .patch('/api/v1/clients/' + id + '/cars/' + carId)
        .set('Authorization', `${token}`)
        .send()
        .expect(200);
    });
  });

  afterAll(async () => {
    const clientsRepository = moduleFixture.get<Repository<Clients>>(
      getRepositoryToken(Clients),
    );
    const carsRepository = moduleFixture.get<Repository<Cars>>(
      getRepositoryToken(Cars),
    );
    await carsRepository.createQueryBuilder().delete().from(Cars).execute();
    await clientsRepository
      .createQueryBuilder()
      .delete()
      .from(Clients)
      .execute();
  });
});
