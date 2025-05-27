import {
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  CreateDateColumn
  
} from "typeorm";
import { Machine } from "src/modules/machine/entities/machine.entity";

@Entity() 
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 35 })
  name!: string;

  @Column({ length: 35 })
  lastName!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ unique: true, nullable: false })
  rut!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: false })
  role!: number;

  @Column({ default: true })
  status!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

 @Column({ nullable: true })
  token?: string;

  @OneToOne(() => Machine, { nullable: true })
  @JoinColumn()
  machine?: Machine;
}





  