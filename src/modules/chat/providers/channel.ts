import { Injectable } from '@graphql-modules/di';
import { getConnection } from 'typeorm';

import { CreateChannelInput, Channel as ChannelObj } from '#Base/generated/typed-schema';
import { User } from '#Modules/user/models';
import { Channel, Participant } from '../models';

@Injectable()
export class ChannelProvider {
  async createChannel(data: CreateChannelInput): Promise<ChannelObj> {
    const user = await User.findOne(data.participant, { select: ['id'] });
    if (!user) throw 'hello'; //stop the code here throw error

    const channelExists = await Channel.find({ where: { participants: [user.id, 'eu'] } });
    if (channelExists) return channelExists;

    const channel = new Channel();
    const participantTest = new Participant();
    channel.participants = [participantTest];

    const connection = getConnection();
    return await connection.manager.save(channel);

    //should add a new value to the sbuscription
    //should add a new message if such exists
  },
}
