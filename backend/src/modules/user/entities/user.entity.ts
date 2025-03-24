import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity
  
} from "typeorm";

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
}

  