import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Product } from "./products.entity";
import { JoinColumn } from "typeorm";
import { Role } from "./roles.entity";

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

  @ManyToMany(() => Product, { cascade: true })
  @JoinTable({
    name: "user_products",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "product_id", referencedColumnName: "id" },
  })
  products: Product[];

  @Column({ type: "integer", nullable: true })
  userRoleId!: number;

  @ManyToOne(() => Role, { cascade: true })
  @JoinColumn({ name: "userRoleId" })
  role: Role;

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
