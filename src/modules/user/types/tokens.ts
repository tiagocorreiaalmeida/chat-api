import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Tokens {
  @Field()
  token: string;

  @Field()
  refreshToken: string;
}
