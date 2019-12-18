import { Resolver, Query } from 'type-graphql';

import User from '../models/User';

@Resolver()
export class MeResolver {
  @Query(() => User)
  me(): User {
    return User.find();
  }
}
