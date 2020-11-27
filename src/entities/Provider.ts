import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import Patient from './Patient';

@Entity({
  name: 'providers',
  orderBy: {
    name: 'ASC',
  },
})
class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Patient, (patient) => patient.providers)
  @JoinTable()
  patients: Patient[];

  // Have to create a patients relation

  // @ManyToMany() This many to many will link providers to patients
}

export default Provider;
