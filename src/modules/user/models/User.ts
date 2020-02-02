import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, CreateDateColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 50,
    unique: true,
  })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    name: 'is_active',
    default: false,
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    name: 'last_seen',
    nullable: true,
  })
  lastSeen?: Date;
}
