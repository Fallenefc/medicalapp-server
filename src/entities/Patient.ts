import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany,
} from 'typeorm';
import Provider from './Provider';

@Entity()
class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  DoB: string;

  // @Column({ unique: true })
  // uniqueId: string; Make this a unique identifier like a health card?

  @Column()
  name: string;

  @Column()
  sex: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Provider, (providers) => providers.patients)
  providers: Provider[];
}

export default Patient;
