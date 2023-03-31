import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Specialties } from './specialties.entity';

@Entity()
export class Mechanics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index({ unique: true })
  @Column()
  cpf: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  phone: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Specialties, (specialties) => specialties.mechanic, {
    eager: true,
  })
  @JoinColumn()
  specialties: Specialties[];

  @Column({ type: 'date' })
  hiringDate: Date;

  @Column()
  serviceFee: number;

  @Column()
  status: string;
}
