import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class User {
  @Field(() => ID)
  id: number;
}
