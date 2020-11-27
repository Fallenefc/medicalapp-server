/* eslint-disable no-unused-vars */
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable,
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

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Patient, (patient) => patient.providers)
  @JoinTable()
  patients: Patient[];
}

export default Provider;
