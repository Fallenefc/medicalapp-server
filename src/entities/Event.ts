import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import Measurement from './Measurement';
import Patient from './Patient';
import Provider from './Provider';

@Entity()
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({ type: 'float' })
  measurementValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.event)
  measurement: Measurement;

  @ManyToOne(() => Provider, (provider: Provider) => provider.event)
  provider: Provider;

  @ManyToOne(() => Patient, (patient: Patient) => patient.event)
  patient: Patient;
}

export default Event;
