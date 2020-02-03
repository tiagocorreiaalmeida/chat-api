import { BaseEntity, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';

import { User } from '#Modules/user/models';
import { Channel } from './Channel';

export enum ParticipantType {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export class Participant extends BaseEntity {
  @ManyToMany(() => User)
  @JoinTable()
  user: User;

  @ManyToMany(
    () => Channel,
    (Channel) => Channel.participants,
  )
  channel: Channel;

  @CreateDateColumn({
    name: 'joined_at',
  })
  joinedAt: Date;

  @Column({
    type: 'enum',
    enum: ParticipantType,
    default: ParticipantType.MEMBER,
  })
  type: ParticipantType;
}
