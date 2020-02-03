import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';

import { Participant } from './Participant';

export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    name: 'is_group',
  })
  isGroup: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToMany(
    () => Participant,
    (participant) => participant.channel,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  participants: Participant[];
}
