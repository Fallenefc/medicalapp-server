import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity,
} from 'typeorm';
import Snapshot from './Snapshot';

//

@Entity()
class Measurement extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'float' })
  minValue: number;

  @Column({ type: 'float' })
  maxValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Snapshot, (snapshot) => snapshot.measurement)
  snapshot: Snapshot[];
}

export default Measurement;
