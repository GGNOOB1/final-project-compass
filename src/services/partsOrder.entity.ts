import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Services } from './services.entity';

@Entity()
export class PartsOrder {
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

  @ManyToOne(() => Services, (services) => services.partsService)
  service: Services;
}
