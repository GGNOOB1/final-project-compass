import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Parts {
  @PrimaryGeneratedColumn('uuid')
  partId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  qtd: number;

  @Column()
  unitPrice: string;
}
