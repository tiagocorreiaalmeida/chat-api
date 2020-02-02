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
  Date: any,
};

export type ConfirmInput = {
  token: Scalars['String'],
};


export type LoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type LoginPayload = {
   __typename?: 'LoginPayload',
  user: User,
  tokens: Tokens,
};

export type Mutation = {
   __typename?: 'Mutation',
  login: LoginPayload,
  register: User,
  confirm: Scalars['Boolean'],
};


export type MutationLoginArgs = {
  data: LoginInput
};


export type MutationRegisterArgs = {
  data: RegisterInput
};


export type MutationConfirmArgs = {
  data: ConfirmInput
};

export type Query = {
   __typename?: 'Query',
  test: Scalars['String'],
};

export type RegisterInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String'],
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
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
  lastSeen?: Maybe<Scalars['Date']>,
};

export type ConfirmMutationVariables = {
  data: ConfirmInput
};


export type ConfirmMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirm'>
);

export type LoginMutationVariables = {
  data: LoginInput
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginPayload' }
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
  data: RegisterInput
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'isActive' | 'createdAt' | 'updatedAt' | 'lastSeen'>
  ) }
);


export const ConfirmDocument = gql`
    mutation confirm($data: ConfirmInput!) {
  confirm(data: $data)
}
    `;
export const LoginDocument = gql`
    mutation login($data: LoginInput!) {
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
    mutation register($data: RegisterInput!) {
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
    confirm(variables: ConfirmMutationVariables): Promise<ConfirmMutation> {
      return client.request<ConfirmMutation>(print(ConfirmDocument), variables);
    },
    login(variables: LoginMutationVariables): Promise<LoginMutation> {
      return client.request<LoginMutation>(print(LoginDocument), variables);
    },
    register(variables: RegisterMutationVariables): Promise<RegisterMutation> {
      return client.request<RegisterMutation>(print(RegisterDocument), variables);
    }
  };
}