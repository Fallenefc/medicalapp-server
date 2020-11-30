import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import Measurement from './Measurement';
import Patient from './Patient';
import Provider from './Provider';

@Entity()
class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Change back to date, this is just for testing
  @Column()
  date: string;

  @Column({ type: 'float' })
  measurementValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.event)
  measurement: Measurement;

  @ManyToOne(() => Provider, (provider: Provider) => provider.event)
  providerId: Provider;

  @ManyToOne(() => Patient, (patient: Patient) => patient.event)
  patient: Patient;
}

export default Event;
