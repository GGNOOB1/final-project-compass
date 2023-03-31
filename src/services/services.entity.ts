import { Parts } from 'src/parts/parts.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PartsOrder } from './partsOrder.entity';

@Entity()
export class Services {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clientId: string;

  @Column()
  carId: string;

  @Column()
  mechanicId: string;

  @Column({ type: 'date' })
  serviceEstimatedDeliveryDate: Date;

  @Column()
  description: string;

  @OneToMany(() => PartsOrder, (partsOrder) => partsOrder.service, {
    eager: true,
  })
  partsOrder: PartsOrder[];

  @Column()
  status: string;
}
