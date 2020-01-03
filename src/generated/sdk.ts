import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};


export type LoginUserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type LoginUserPayload = {
   __typename?: 'LoginUserPayload',
  user: User,
  tokens: Tokens,
};

export type Mutation = {
   __typename?: 'Mutation',
  confirmUser: Scalars['Boolean'],
  login: LoginUserPayload,
  register: User,
};


export type MutationConfirmUserArgs = {
  token: Scalars['String']
};


export type MutationLoginArgs = {
  data: LoginUserInput
};


export type MutationRegisterArgs = {
  data: RegisterUserInput
};

export type Query = {
   __typename?: 'Query',
  me: Scalars['String'],
};

export type RegisterUserInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type Tokens = {
   __typename?: 'Tokens',
  token: Scalars['String'],
  refreshToken: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
  email: Scalars['String'],
  isActive: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  lastSeen?: Maybe<Scalars['DateTime']>,
};

export type ConfirmUserMutationVariables = {
  token: Scalars['String']
};


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type LoginMutationVariables = {
  data: LoginUserInput
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginUserPayload' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'isActive' | 'createdAt' | 'updatedAt' | 'lastSeen'>
    ), tokens: (
      { __typename?: 'Tokens' }
      & Pick<Tokens, 'token' | 'refreshToken'>
    ) }
  ) }
);

export type RegisterMutationVariables = {
  data: RegisterUserInput
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'isActive' | 'createdAt' | 'updatedAt' | 'lastSeen'>
  ) }
);


export const ConfirmUserDocument = gql`
    mutation confirmUser($token: String!) {
  confirmUser(token: $token)
}
    `;
export const LoginDocument = gql`
    mutation login($data: LoginUserInput!) {
  login(data: $data) {
    user {
      id
      username
      email
      isActive
      createdAt
      updatedAt
      lastSeen
    }
    tokens {
      token
      refreshToken
    }
  }
}
    `;
export const RegisterDocument = gql`
    mutation register($data: RegisterUserInput!) {
  register(data: $data) {
    id
    username
    email
    isActive
    createdAt
    updatedAt
    lastSeen
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    confirmUser(variables: ConfirmUserMutationVariables): Promise<ConfirmUserMutation> {
      return client.request<ConfirmUserMutation>(print(ConfirmUserDocument), variables);
    },
    login(variables: LoginMutationVariables): Promise<LoginMutation> {
      return client.request<LoginMutation>(print(LoginDocument), variables);
    },
    register(variables: RegisterMutationVariables): Promise<RegisterMutation> {
      return client.request<RegisterMutation>(print(RegisterDocument), variables);
    }
  };
}