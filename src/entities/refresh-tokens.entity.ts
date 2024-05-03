import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "refresh_tokens" })
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public userId!: number;

  @Column({ type: "varchar", nullable: false })
  public token!: string;

  @Column({ type: "timestamp", nullable: false })
  public expireDate!: Date;

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
