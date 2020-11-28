import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany,
} from 'typeorm';
import Provider from './Provider';

@Entity()
class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Provider, (provider) => provider.patients)
  providers: Provider[];
}

export default Patient;
