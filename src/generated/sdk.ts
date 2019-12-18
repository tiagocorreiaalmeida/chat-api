import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
};

export type MutationRegisterArgs = {
  data: RegisterUserInput;
};

export type Query = {
  __typename?: 'Query';
  me: Scalars['String'];
};

export type RegisterUserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  isActive: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  lastSeen?: Maybe<Scalars['DateTime']>;
};

export type RegisterMutationVariables = {
  data: RegisterUserInput;
};

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'User' } & Pick<
    User,
    'id' | 'username' | 'email' | 'password' | 'isActive' | 'createdAt' | 'updatedAt' | 'lastSeen'
  >;
};

export const RegisterDocument = gql`
  mutation Register($data: RegisterUserInput!) {
    register(data: $data) {
      id
      username
      email
      password
      isActive
      createdAt
      updatedAt
      lastSeen
    }
  }
`;
export function getSdk(client: GraphQLClient) {
  return {
    Register(variables: RegisterMutationVariables): Promise<RegisterMutation> {
      return client.request<RegisterMutation>(print(RegisterDocument), variables);
    },
  };
}
