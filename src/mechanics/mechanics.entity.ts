import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Specialties } from './specialties.entity';

@Entity()
export class Mechanics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birthdate: Date;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => Specialties, (specialties) => specialties.specialty, {
    eager: true,
  })
  @JoinColumn()
  specialties: Specialties[];

  @Column()
  hiringDate: Date;

  @Column()
  serviceFee: number;

  @Column()
  status: string;
}
