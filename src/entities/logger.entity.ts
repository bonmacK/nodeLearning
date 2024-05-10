import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "Logger" })
export class Logger extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 128, nullable: false })
  method!: string;

  @Column({ type: "varchar", length: 128, nullable: false })
  url!: string;

  @Column({ type: "varchar", length: 128, nullable: false })
  status!: number;
}
