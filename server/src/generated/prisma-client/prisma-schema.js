module.exports = {
        typeDefs: /* GraphQL */ `type Account {
  id: ID!
  name: String!
  balance: Float!
  allowance: Float!
  interest: Float!
  owner: User!
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction!]
}

type AccountConnection {
  pageInfo: PageInfo!
  edges: [AccountEdge]!
  aggregate: AggregateAccount!
}

input AccountCreateInput {
  name: String!
  balance: Float!
  allowance: Float!
  interest: Float!
  owner: UserCreateOneWithoutAccountsInput!
  transactions: TransactionCreateManyWithoutAccountInput
}

input AccountCreateManyWithoutOwnerInput {
  create: [AccountCreateWithoutOwnerInput!]
  connect: [AccountWhereUniqueInput!]
}

input AccountCreateOneWithoutTransactionsInput {
  create: AccountCreateWithoutTransactionsInput
  connect: AccountWhereUniqueInput
}

input AccountCreateWithoutOwnerInput {
  name: String!
  balance: Float!
  allowance: Float!
  interest: Float!
  transactions: TransactionCreateManyWithoutAccountInput
}

input AccountCreateWithoutTransactionsInput {
  name: String!
  balance: Float!
  allowance: Float!
  interest: Float!
  owner: UserCreateOneWithoutAccountsInput!
}

type AccountEdge {
  node: Account!
  cursor: String!
}

enum AccountOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  balance_ASC
  balance_DESC
  allowance_ASC
  allowance_DESC
  interest_ASC
  interest_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AccountPreviousValues {
  id: ID!
  name: String!
  balance: Float!
  allowance: Float!
  interest: Float!
}

input AccountScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  balance: Float
  balance_not: Float
  balance_in: [Float!]
  balance_not_in: [Float!]
  balance_lt: Float
  balance_lte: Float
  balance_gt: Float
  balance_gte: Float
  allowance: Float
  allowance_not: Float
  allowance_in: [Float!]
  allowance_not_in: [Float!]
  allowance_lt: Float
  allowance_lte: Float
  allowance_gt: Float
  allowance_gte: Float
  interest: Float
  interest_not: Float
  interest_in: [Float!]
  interest_not_in: [Float!]
  interest_lt: Float
  interest_lte: Float
  interest_gt: Float
  interest_gte: Float
  AND: [AccountScalarWhereInput!]
  OR: [AccountScalarWhereInput!]
  NOT: [AccountScalarWhereInput!]
}

type AccountSubscriptionPayload {
  mutation: MutationType!
  node: Account
  updatedFields: [String!]
  previousValues: AccountPreviousValues
}

input AccountSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AccountWhereInput
  AND: [AccountSubscriptionWhereInput!]
  OR: [AccountSubscriptionWhereInput!]
  NOT: [AccountSubscriptionWhereInput!]
}

input AccountUpdateInput {
  name: String
  balance: Float
  allowance: Float
  interest: Float
  owner: UserUpdateOneRequiredWithoutAccountsInput
  transactions: TransactionUpdateManyWithoutAccountInput
}

input AccountUpdateManyDataInput {
  name: String
  balance: Float
  allowance: Float
  interest: Float
}

input AccountUpdateManyMutationInput {
  name: String
  balance: Float
  allowance: Float
  interest: Float
}

input AccountUpdateManyWithoutOwnerInput {
  create: [AccountCreateWithoutOwnerInput!]
  delete: [AccountWhereUniqueInput!]
  connect: [AccountWhereUniqueInput!]
  disconnect: [AccountWhereUniqueInput!]
  update: [AccountUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [AccountUpsertWithWhereUniqueWithoutOwnerInput!]
  deleteMany: [AccountScalarWhereInput!]
  updateMany: [AccountUpdateManyWithWhereNestedInput!]
}

input AccountUpdateManyWithWhereNestedInput {
  where: AccountScalarWhereInput!
  data: AccountUpdateManyDataInput!
}

input AccountUpdateOneRequiredWithoutTransactionsInput {
  create: AccountCreateWithoutTransactionsInput
  update: AccountUpdateWithoutTransactionsDataInput
  upsert: AccountUpsertWithoutTransactionsInput
  connect: AccountWhereUniqueInput
}

input AccountUpdateWithoutOwnerDataInput {
  name: String
  balance: Float
  allowance: Float
  interest: Float
  transactions: TransactionUpdateManyWithoutAccountInput
}

input AccountUpdateWithoutTransactionsDataInput {
  name: String
  balance: Float
  allowance: Float
  interest: Float
  owner: UserUpdateOneRequiredWithoutAccountsInput
}

input AccountUpdateWithWhereUniqueWithoutOwnerInput {
  where: AccountWhereUniqueInput!
  data: AccountUpdateWithoutOwnerDataInput!
}

input AccountUpsertWithoutTransactionsInput {
  update: AccountUpdateWithoutTransactionsDataInput!
  create: AccountCreateWithoutTransactionsInput!
}

input AccountUpsertWithWhereUniqueWithoutOwnerInput {
  where: AccountWhereUniqueInput!
  update: AccountUpdateWithoutOwnerDataInput!
  create: AccountCreateWithoutOwnerInput!
}

input AccountWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  balance: Float
  balance_not: Float
  balance_in: [Float!]
  balance_not_in: [Float!]
  balance_lt: Float
  balance_lte: Float
  balance_gt: Float
  balance_gte: Float
  allowance: Float
  allowance_not: Float
  allowance_in: [Float!]
  allowance_not_in: [Float!]
  allowance_lt: Float
  allowance_lte: Float
  allowance_gt: Float
  allowance_gte: Float
  interest: Float
  interest_not: Float
  interest_in: [Float!]
  interest_not_in: [Float!]
  interest_lt: Float
  interest_lte: Float
  interest_gt: Float
  interest_gte: Float
  owner: UserWhereInput
  transactions_every: TransactionWhereInput
  transactions_some: TransactionWhereInput
  transactions_none: TransactionWhereInput
  AND: [AccountWhereInput!]
  OR: [AccountWhereInput!]
  NOT: [AccountWhereInput!]
}

input AccountWhereUniqueInput {
  id: ID
}

type AggregateAccount {
  count: Int!
}

type AggregateTransaction {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createAccount(data: AccountCreateInput!): Account!
  updateAccount(data: AccountUpdateInput!, where: AccountWhereUniqueInput!): Account
  updateManyAccounts(data: AccountUpdateManyMutationInput!, where: AccountWhereInput): BatchPayload!
  upsertAccount(where: AccountWhereUniqueInput!, create: AccountCreateInput!, update: AccountUpdateInput!): Account!
  deleteAccount(where: AccountWhereUniqueInput!): Account
  deleteManyAccounts(where: AccountWhereInput): BatchPayload!
  createTransaction(data: TransactionCreateInput!): Transaction!
  updateTransaction(data: TransactionUpdateInput!, where: TransactionWhereUniqueInput!): Transaction
  updateManyTransactions(data: TransactionUpdateManyMutationInput!, where: TransactionWhereInput): BatchPayload!
  upsertTransaction(where: TransactionWhereUniqueInput!, create: TransactionCreateInput!, update: TransactionUpdateInput!): Transaction!
  deleteTransaction(where: TransactionWhereUniqueInput!): Transaction
  deleteManyTransactions(where: TransactionWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  account(where: AccountWhereUniqueInput!): Account
  accounts(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Account]!
  accountsConnection(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AccountConnection!
  transaction(where: TransactionWhereUniqueInput!): Transaction
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction]!
  transactionsConnection(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TransactionConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  account(where: AccountSubscriptionWhereInput): AccountSubscriptionPayload
  transaction(where: TransactionSubscriptionWhereInput): TransactionSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Transaction {
  id: ID!
  description: String!
  amount: Float!
  createdAt: DateTime!
  account: Account!
}

type TransactionConnection {
  pageInfo: PageInfo!
  edges: [TransactionEdge]!
  aggregate: AggregateTransaction!
}

input TransactionCreateInput {
  description: String!
  amount: Float!
  account: AccountCreateOneWithoutTransactionsInput!
}

input TransactionCreateManyWithoutAccountInput {
  create: [TransactionCreateWithoutAccountInput!]
  connect: [TransactionWhereUniqueInput!]
}

input TransactionCreateWithoutAccountInput {
  description: String!
  amount: Float!
}

type TransactionEdge {
  node: Transaction!
  cursor: String!
}

enum TransactionOrderByInput {
  id_ASC
  id_DESC
  description_ASC
  description_DESC
  amount_ASC
  amount_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TransactionPreviousValues {
  id: ID!
  description: String!
  amount: Float!
  createdAt: DateTime!
}

input TransactionScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  amount: Float
  amount_not: Float
  amount_in: [Float!]
  amount_not_in: [Float!]
  amount_lt: Float
  amount_lte: Float
  amount_gt: Float
  amount_gte: Float
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [TransactionScalarWhereInput!]
  OR: [TransactionScalarWhereInput!]
  NOT: [TransactionScalarWhereInput!]
}

type TransactionSubscriptionPayload {
  mutation: MutationType!
  node: Transaction
  updatedFields: [String!]
  previousValues: TransactionPreviousValues
}

input TransactionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TransactionWhereInput
  AND: [TransactionSubscriptionWhereInput!]
  OR: [TransactionSubscriptionWhereInput!]
  NOT: [TransactionSubscriptionWhereInput!]
}

input TransactionUpdateInput {
  description: String
  amount: Float
  account: AccountUpdateOneRequiredWithoutTransactionsInput
}

input TransactionUpdateManyDataInput {
  description: String
  amount: Float
}

input TransactionUpdateManyMutationInput {
  description: String
  amount: Float
}

input TransactionUpdateManyWithoutAccountInput {
  create: [TransactionCreateWithoutAccountInput!]
  delete: [TransactionWhereUniqueInput!]
  connect: [TransactionWhereUniqueInput!]
  disconnect: [TransactionWhereUniqueInput!]
  update: [TransactionUpdateWithWhereUniqueWithoutAccountInput!]
  upsert: [TransactionUpsertWithWhereUniqueWithoutAccountInput!]
  deleteMany: [TransactionScalarWhereInput!]
  updateMany: [TransactionUpdateManyWithWhereNestedInput!]
}

input TransactionUpdateManyWithWhereNestedInput {
  where: TransactionScalarWhereInput!
  data: TransactionUpdateManyDataInput!
}

input TransactionUpdateWithoutAccountDataInput {
  description: String
  amount: Float
}

input TransactionUpdateWithWhereUniqueWithoutAccountInput {
  where: TransactionWhereUniqueInput!
  data: TransactionUpdateWithoutAccountDataInput!
}

input TransactionUpsertWithWhereUniqueWithoutAccountInput {
  where: TransactionWhereUniqueInput!
  update: TransactionUpdateWithoutAccountDataInput!
  create: TransactionCreateWithoutAccountInput!
}

input TransactionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  amount: Float
  amount_not: Float
  amount_in: [Float!]
  amount_not_in: [Float!]
  amount_lt: Float
  amount_lte: Float
  amount_gt: Float
  amount_gte: Float
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  account: AccountWhereInput
  AND: [TransactionWhereInput!]
  OR: [TransactionWhereInput!]
  NOT: [TransactionWhereInput!]
}

input TransactionWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  birthday: DateTime!
  isAdmin: Boolean
  accounts(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Account!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  password: String!
  birthday: DateTime!
  isAdmin: Boolean
  accounts: AccountCreateManyWithoutOwnerInput
}

input UserCreateOneWithoutAccountsInput {
  create: UserCreateWithoutAccountsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutAccountsInput {
  name: String!
  email: String!
  password: String!
  birthday: DateTime!
  isAdmin: Boolean
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  birthday_ASC
  birthday_DESC
  isAdmin_ASC
  isAdmin_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
  birthday: DateTime!
  isAdmin: Boolean
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  birthday: DateTime
  isAdmin: Boolean
  accounts: AccountUpdateManyWithoutOwnerInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
  birthday: DateTime
  isAdmin: Boolean
}

input UserUpdateOneRequiredWithoutAccountsInput {
  create: UserCreateWithoutAccountsInput
  update: UserUpdateWithoutAccountsDataInput
  upsert: UserUpsertWithoutAccountsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutAccountsDataInput {
  name: String
  email: String
  password: String
  birthday: DateTime
  isAdmin: Boolean
}

input UserUpsertWithoutAccountsInput {
  update: UserUpdateWithoutAccountsDataInput!
  create: UserCreateWithoutAccountsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  birthday: DateTime
  birthday_not: DateTime
  birthday_in: [DateTime!]
  birthday_not_in: [DateTime!]
  birthday_lt: DateTime
  birthday_lte: DateTime
  birthday_gt: DateTime
  birthday_gte: DateTime
  isAdmin: Boolean
  isAdmin_not: Boolean
  accounts_every: AccountWhereInput
  accounts_some: AccountWhereInput
  accounts_none: AccountWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    