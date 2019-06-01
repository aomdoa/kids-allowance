import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import {
  NonNegativeFloat,
  EmailAddress
} from '@okgrow/graphql-scalars'
import {
  GraphQLDate
} from 'graphql-iso-date'
import cron from 'node-cron'
import moment from 'moment'
import { transaction } from './utils'
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

cron.schedule('0 0 * * 0', async () => {
  console.log('Pay applied')
  const users = await prisma.users()
  users.forEach(async (user) => {
    const years = moment().diff(user.birthday, 'years')
    const accounts = await prisma.accounts({ where: { owner: { id: user.id } } })
    accounts.forEach(async (account) => {
      const amount = years * account.allowance
      await transaction(prisma, account, amount, 'Weekly allowance')
    })
  })
})

cron.schedule('0 0 1 * *', async () => {
  console.log('Interest applied')
  const users = await prisma.users()
  users.forEach(async (user) => {
    const accounts = await prisma.accounts({ where: { owner: { id: user.id } } })
    accounts.forEach(async (account) => {
      const amount = account.balance * account.interest
      await transaction(prisma, account, amount, 'Monthly interest')
    })
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
