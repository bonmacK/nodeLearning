import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { User } from "./users.entity";

@Entity({ name: "roles" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 128, nullable: false })
  role!: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
