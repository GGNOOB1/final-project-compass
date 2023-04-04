import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;
}
