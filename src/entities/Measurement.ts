import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity,
} from 'typeorm';
import Event from './Event';

//

@Entity()
class Measurement extends BaseEntity {
  @PrimaryGeneratedColumn()
  name: string;

  @Column('uuid')
  id: string;

  @Column({ type: 'float' })
  minValue: number;

  @Column({ type: 'float' })
  maxValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Event, (event) => event.measurement)
  event: Event[];
}

export default Measurement;
