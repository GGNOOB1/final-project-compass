import { Services } from 'src/services/services.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Parts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  qtd: number;

  @Column()
  unitPrice: string;

  @ManyToOne(() => Services, (services) => services.parts)
  services: Services;
}
