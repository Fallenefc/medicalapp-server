import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne,
} from 'typeorm';
import Patient from './Patient';

@Entity()
class Warning extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  // Change later to date type!
  @Column()
  date: string;

  // Store by HEX
  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient, (patient: Patient) => patient.event)
  patient: Patient;
}

export default Warning;
