import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../src/auth/auth.module';
import { Repository } from 'typeorm';
import { Mechanics } from '../src/mechanics/mechanics.entity';
import { Specialties } from '../src/mechanics/specialties.entity';
import { MechanicsModule } from '../src/mechanics/mechanics.module';
import { Parts } from '../src/parts/parts.entity';

describe('Parts (e2e)', () => {
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
          entities: [Parts, Mechanics, Specialties],
        }),

        AuthModule,
        MechanicsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Testing parts route', () => {
    let user = {
      name: 'Teste user',
      cpf: '193.548.930-58',
      birthday: '10/05/1990',
      phone: '(95) 98343-7116',
      email: 'testemechanic@gmail.com',
      password: 'gege122',
      confirmPassword: 'gege122',
      specialties: ['Mechanic', 'Vencedor de vacinação'],
      hiringDate: '05/02/2022',
      serviceFee: 10,
      status: 'active',
    };

    let part = {
      title: 'Câmbio',
      description: 'Passagem de marcha',
      qtd: 70,
      unitPrice: '90,50',
    };
    let token: string;
    let id: string;
    let partId: string;

    it('It should create a mechanic user and return it in the response', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/mechanics')
        .send(user)
        .expect(201);
      id = response.body.id;
      expect(response.body.name).toEqual(user.name);
      expect(response.body.cpf).toEqual(user.cpf);
      expect(response.body.birthday).toEqual(user.birthday);
      expect(response.body.phone).toEqual(user.phone);
      expect(response.body.email).toEqual(user.email);
      expect(response.body.password).toBeUndefined();
      expect(response.body.confirmPassword).toBeUndefined();
      expect(response.body.hiringDate).toEqual(user.hiringDate);
      expect(response.body.serviceFee).toEqual(user.serviceFee);
      expect(response.body.status).toEqual(user.status);
    });
    it('Should throw an unauthorized error for trying to access without token', () => {
      return request(app.getHttpServer()).get('/api/v1/clients').expect(401);
    });

    it('You should log in and receive the valid token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/mechanic/login')
        .send({ email: 'testemechanic@gmail.com', password: 'gege122' })
        .expect(200);
      token = response.header.authorization;
    });

    it('It should create a part and return it in the response', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/parts')
        .set('Authorization', `${token}`)
        .send(part)
        .expect(201);
      partId = response.body.id;
      expect(response.body.title).toEqual(part.title);
      expect(response.body.description).toEqual(part.description);
      expect(response.body.qtd).toEqual(part.qtd);
      expect(response.body.unitPrice).toEqual(part.unitPrice);
    });

    // it('Must return data from a part', async () => {
    //   const response = await request(app.getHttpServer())
    //     .get('/api/v1/parts/' + partId)
    //     .set('Authorization', `${token}`)
    //     .expect(200);
    //   console.log(response.body);
    //   console.log(id, partId);
    // });

    // it('You should update a part data', async () => {
    //   let response = await request(app.getHttpServer())
    //     .patch('/api/v1/parts/' + partId)
    //     .set('Authorization', `${token}`)
    //     .send({ qtd: 2000 })
    //     .expect(200);
    //   expect(response.body.qtd).toEqual(2000);
    // });

    it('Must be get all parts', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/parts')
        .set('Authorization', `${token}`)
        .query({ limit: 10, offset: 0 })
        .expect(200);
    });
  });

  afterAll(async () => {
    const mechanicsRepository = moduleFixture.get<Repository<Mechanics>>(
      getRepositoryToken(Mechanics),
    );
    const specialtiesRepository = moduleFixture.get<Repository<Specialties>>(
      getRepositoryToken(Specialties),
    );
    const partsRepository = moduleFixture.get<Repository<Parts>>(
      getRepositoryToken(Parts),
    );

    await specialtiesRepository
      .createQueryBuilder()
      .delete()
      .from(Specialties)
      .execute();
    await mechanicsRepository
      .createQueryBuilder()
      .delete()
      .from(Mechanics)
      .execute();
    await partsRepository.createQueryBuilder().delete().from(Parts).execute();
  });
});
