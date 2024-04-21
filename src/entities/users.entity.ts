import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "User" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 128, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 128, unique: true, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 128, unique: true, nullable: false })
  password!: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;
}
