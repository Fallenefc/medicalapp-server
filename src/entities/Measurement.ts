import {
  Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, PrimaryColumn,
} from 'typeorm';
import Snapshot from './Snapshot';

@Entity()
class Measurement extends BaseEntity {
  @PrimaryColumn(('varchar'))
  id: string;

  @Column()
  name: string;

  @Column({ type: 'float' })
  minValue: number;

  @Column({ type: 'float' })
  maxValue: number;

  @Column()
  unit: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Snapshot, (snapshot) => snapshot.measurement)
  snapshot: Snapshot[];
}

export default Measurement;
