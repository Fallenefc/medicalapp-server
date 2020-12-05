import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToMany, JoinTable, OneToMany, BaseEntity,
} from 'typeorm';
import Patient from './Patient';
import Snapshot from './Snapshot';

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
  verified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Patient, (patient) => patient.providers)
  @JoinTable({ name: 'patient-provider' })
  patients: Patient[];

  @OneToMany(() => Snapshot, (snapshot) => snapshot.providerId)
  snapshot: Snapshot[];
}

export default Provider;
