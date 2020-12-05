import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToMany, OneToMany, BaseEntity,
} from 'typeorm';
import Provider from './Provider';
import Snapshot from './Snapshot';
import Flag from './Flag';
import FamilyHistory from './FamilyHistory';
import Note from './Note';
import Problem from './Problems';

@Entity()
class Patient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  uniqueId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: null })
  email: string | null;

  @Column()
  DoB: Date;

  @Column()
  sex: number;

  @Column({ default: null })
  gender: string | null;

  @Column({ type: 'float', default: null })
  height: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Provider, (provider) => provider.patients)
  providers: Provider[];

  @OneToMany(() => Snapshot, (snapshot) => snapshot.patient)
  snapshot: Snapshot[];

  @OneToMany(() => FamilyHistory, (familyHistory) => familyHistory.patient)
  familyHistory: FamilyHistory[];

  @OneToMany(() => Note, (note) => note.patient)
  note: Note[];

  @OneToMany(() => Problem, (problem) => problem.patient)
  problem: Problem[];

  @OneToMany(() => Flag, (flag) => flag.patient)
  flag: Flag[];
}

export default Patient;
