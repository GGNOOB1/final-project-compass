import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cars {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  license_plate: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  manufacturer: string;

  @Column()
  color: string;
}
