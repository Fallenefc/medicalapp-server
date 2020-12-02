import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToMany, OneToMany, BaseEntity,
} from 'typeorm';
import Provider from './Provider';
import Snapshot from './Snapshot';
import Flag from './Flag';

@Entity()
class Patient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  uniqueId: string | null;

  @Column()
  title: string | null;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  DoB: string | null;

  @Column({ default: null })
  sex: number | null;

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

  @OneToMany(() => Flag, (flag) => flag.patient)
  flag: Flag[];
}

export default Patient;
