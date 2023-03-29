import { Entity, ManyToOne } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Mechanics } from './mechanics.entity';

@Entity()
export class Specialties {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Mechanics, (mechanics) => mechanics.specialties)
  mechanic: Mechanics;
}
