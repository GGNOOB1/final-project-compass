import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  serviceEstimatedDeliveryDate: Date;

  @Column()
  description: string;

  // Relationship one to many
  @Column()
  parts: [string];

  @Column()
  status: string;
}
