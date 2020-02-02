import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ModuleContext } from '@graphql-modules/core';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn = (obj: any, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Mutation: ResolverTypeWrapper<{}>,
  LoginInput: LoginInput,
  LoginPayload: ResolverTypeWrapper<LoginPayload>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Tokens: ResolverTypeWrapper<Tokens>,
  RegisterInput: RegisterInput,
  ConfirmInput: ConfirmInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  Mutation: {},
  LoginInput: LoginInput,
  LoginPayload: LoginPayload,
  User: User,
  ID: Scalars['ID'],
  Boolean: Scalars['Boolean'],
  Date: Scalars['Date'],
  Tokens: Tokens,
  RegisterInput: RegisterInput,
  ConfirmInput: ConfirmInput,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type LoginPayloadResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  tokens?: Resolver<ResolversTypes['Tokens'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type MutationResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['LoginPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'data'>>,
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'data'>>,
  confirm?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationConfirmArgs, 'data'>>,
};

export type QueryResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  test?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type TokensResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type UserResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  lastSeen?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type Resolvers<ContextType = ModuleContext> = {
  Date?: GraphQLScalarType,
  LoginPayload?: LoginPayloadResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Tokens?: TokensResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = ModuleContext> = Resolvers<ContextType>;
