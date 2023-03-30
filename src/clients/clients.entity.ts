import { Entity, Column, Index, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Cars } from './cars/cars.entity';

@Entity({ name: 'clients' })
export class Clients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  client_type: string;

  @Column({ type: 'timestamp with time zone' })
  birthday: Date;

  @Column()
  phone: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  zipcode: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  neighbourhood: string;

  @Column()
  city: string;

  @OneToMany(() => Cars, (cars) => cars.client, { eager: true })
  cars: Cars[];
}
