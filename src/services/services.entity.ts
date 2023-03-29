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
  // @OneToMany(() => Parts, (parts) => parts.services, {
  //   eager: true,
  // })
  @ManyToMany(() => Parts)
  @JoinTable()
  parts: Parts[];

  @Column()
  status: string;
}
