import { BaseEntity, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';

import { User } from '#Modules/user/models';
import { Channel } from './Channel';

export enum MessageType {
  SYSTEM = 'SYSTEM',
  TEXT = 'TEXT',
}

export class Participant extends BaseEntity {
  id: string;

  channel: Channel;

  sender: User;

  type: MessageType;

  message: string;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}
