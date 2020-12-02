import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import Measurement from './Measurement';
import Patient from './Patient';
import Provider from './Provider';

@Entity()
class Snapshot extends BaseEntity {
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

  @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.snapshot)
  measurement: Measurement;

  @ManyToOne(() => Provider, (provider: Provider) => provider.snapshot)
  providerId: Provider;

  @ManyToOne(() => Patient, (patient: Patient) => patient.snapshot)
  patient: Patient;
}

export default Snapshot;
