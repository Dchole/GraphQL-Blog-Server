import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  author: Scalars['String'];
  postId: Scalars['ID'];
  content: Scalars['String'];
  publishedDate: Scalars['String'];
  replies: Array<Comment>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signUp: User;
  createDraft: Post;
  updateUser: User;
  updateDraft: Post;
  deletePost: Post;
  publish: Post;
  vote: Vote;
  comment: Comment;
};


export type MutationSignUpArgs = {
  fullName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role?: Maybe<Role>;
};


export type MutationCreateDraftArgs = {
  title: Scalars['String'];
  content: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
};


export type MutationUpdateDraftArgs = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationPublishArgs = {
  id: Scalars['ID'];
};


export type MutationVoteArgs = {
  id: Scalars['ID'];
};


export type MutationCommentArgs = {
  id: Scalars['ID'];
  content: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  published: Scalars['Boolean'];
  votes: Array<Scalars['ID']>;
  comments: Array<Comment>;
  commentCount: Scalars['Int'];
  publishedDate?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  author: User;
};

export type Query = {
  __typename?: 'Query';
  login: AuthPayload;
  user: User;
  users: Array<User>;
  post: Post;
  drafts: Array<Post>;
  posts: Array<Post>;
  tags: Array<Scalars['String']>;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  filter?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['ID']>;
  currentUser?: Maybe<Scalars['Boolean']>;
  sortBy?: Maybe<Sort>;
  relating?: Maybe<Array<Maybe<Scalars['String']>>>;
  skip: Scalars['Int'];
  limit: Scalars['Int'];
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export enum Sort {
  PublishedDate = 'published_date',
  Popular = 'popular'
}

export type Subscription = {
  __typename?: 'Subscription';
  newVote: Vote;
  newComment: Comment;
};


export type SubscriptionNewVoteArgs = {
  id: Scalars['ID'];
};


export type SubscriptionNewCommentArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  fullName: Scalars['String'];
  email: Scalars['String'];
  posts: Array<Post>;
  bio?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  role: Role;
  createdAt: Scalars['String'];
};

export type Vote = {
  __typename?: 'Vote';
  userId: Scalars['ID'];
  postId: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  User: ResolverTypeWrapper<User>;
  Post: ResolverTypeWrapper<Post>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Role: Role;
  Sort: Sort;
  Mutation: ResolverTypeWrapper<{}>;
  Vote: ResolverTypeWrapper<Vote>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  AuthPayload: AuthPayload;
  ID: Scalars['ID'];
  User: User;
  Post: Post;
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  Int: Scalars['Int'];
  Mutation: {};
  Vote: Vote;
  Subscription: {};
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publishedDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  replies?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signUp?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'fullName' | 'email' | 'password'>>;
  createDraft?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreateDraftArgs, 'title' | 'content' | 'tags'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, never>>;
  updateDraft?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdateDraftArgs, 'id'>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  publish?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationPublishArgs, 'id'>>;
  vote?: Resolver<ResolversTypes['Vote'], ParentType, ContextType, RequireFields<MutationVoteArgs, 'id'>>;
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCommentArgs, 'id' | 'content'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  publishedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'email' | 'password'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, never>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  drafts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostsArgs, 'skip' | 'limit'>>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  newVote?: SubscriptionResolver<ResolversTypes['Vote'], "newVote", ParentType, ContextType, RequireFields<SubscriptionNewVoteArgs, 'id'>>;
  newComment?: SubscriptionResolver<ResolversTypes['Comment'], "newComment", ParentType, ContextType, RequireFields<SubscriptionNewCommentArgs, 'id'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = {
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
