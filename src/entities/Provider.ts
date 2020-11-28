import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import Patient from './Patient';

@Entity({
  name: 'provider',
  orderBy: {
    name: 'ASC',
  },
})
class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  resetPassword: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Patient, (patient) => patient.providers)
  @JoinTable()
  patients: Patient[];
}

export default Provider;
