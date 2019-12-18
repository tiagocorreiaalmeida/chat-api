import { Resolver, Query } from 'type-graphql';

@Resolver()
export class MeResolver {
  @Query(() => String)
  me(): string {
    return '333hey';
  }
}
