import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne,
} from 'typeorm';
import Patient from './Patient';

@Entity()
class Flag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  // Change later to date type!
  @Column()
  date: Date;

  // Store by HEX? Or by type string?
  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient, (patient: Patient) => patient.snapshot)
  patient: Patient;
}

export default Flag;
