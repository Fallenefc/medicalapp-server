import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import Patient from '../Patient';

@Entity()
class FamilyHistory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  condition: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient, (patient: Patient) => patient.familyHistory)
  patient: Patient;
}

export default FamilyHistory;
