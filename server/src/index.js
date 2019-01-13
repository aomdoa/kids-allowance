import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import {
  NonNegativeFloat,
  EmailAddress
} from '@okgrow/graphql-scalars'
import {
  GraphQLDate
} from 'graphql-iso-date'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Account from './resolvers/Account'
import Transaction from './resolvers/Transaction'

const resolvers = {
  Query,
  Mutation,
  GraphQLDate,
  NonNegativeFloat,
  EmailAddress,
  User,
  Account,
  Transaction
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    }
  }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
