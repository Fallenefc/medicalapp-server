import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import Patient from './Patient';

@Entity()
class Note extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient, (patient: Patient) => patient.note)
  patient: Patient;
}

export default Note;
