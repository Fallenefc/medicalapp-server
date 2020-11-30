import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToMany, JoinTable, OneToMany, BaseEntity,
} from 'typeorm';
import Patient from './Patient';
import Event from './Event';

@Entity({
  name: 'provider',
  orderBy: {
    name: 'ASC',
  },
})
class Provider extends BaseEntity {
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
  @JoinTable({ name: 'patient-provider' })
  patients: Patient[];

  @OneToMany(() => Event, (event) => event.provider)
  event: Event[];
}

export default Provider;
