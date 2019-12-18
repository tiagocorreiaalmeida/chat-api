import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, CreateDateColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({
    length: 100,
    unique: true,
  })
  username: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({
    name: 'is_active',
    default: false,
  })
  isActive: boolean;

  @Field()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Field()
  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({
    name: 'last_seen',
    nullable: true,
  })
  lastSeen?: Date;
}
