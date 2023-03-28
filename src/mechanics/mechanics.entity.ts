import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  specialties: [string];

  @Column()
  hiringDate: Date;

  @Column()
  serviceFee: number;

  @Column()
  status: string;
}
