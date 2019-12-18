import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 100,
    unique: true,
  })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    name: 'is_active',
  })
  isActive: boolean;

  @Column({
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    name: 'last_seen',
  })
  lastSeen: Date;
}
