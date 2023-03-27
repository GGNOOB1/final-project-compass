import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Parts {
  @PrimaryGeneratedColumn('uuid')
  title: string;

  @Column()
  description: string;

  @Column()
  qtd: number;

  @Column()
  unitPrice: string;
}
