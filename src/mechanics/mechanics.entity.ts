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

  @Column()
  cpf: string;

  @Column({ type: 'timestamp with time zone' })
  birthday: Date;

  @Column()
  phone: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @OneToMany(() => Specialties, (specialties) => specialties.mechanic, {
    eager: true,
  })
  @JoinColumn()
  specialties: Specialties[];

  @Column({ type: 'timestamp with time zone' })
  hiringDate: Date;

  @Column()
  serviceFee: number;

  @Column()
  status: string;
}
