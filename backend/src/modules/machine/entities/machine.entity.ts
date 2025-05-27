import {
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn
  
} from "typeorm";


@Entity()
export class Machine {

 @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 10 })
  code!: string;

   @Column({ default: true })
  status!: boolean;



}
