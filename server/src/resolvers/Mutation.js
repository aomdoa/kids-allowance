import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getUser } from '../utils'
import { APP_SECRET } from '../config'
import _ from 'lodash'

async function createUser (parent, args, context, info) {
  const currentUser = getUser(context)
  if (!currentUser.isAdmin) {
    throw new Error('Only administrators can create users')
  }
  const password = await bcrypt.hash(args.password, 10)
  return context.prisma.createUser({ ...args, password })
}

async function updateUser (parent, args, context, info) {
  const currentUser = getUser(context)
  if (args.id !== currentUser.id && !currentUser.isAdmin) {
    throw new Error('Only administrators can edit other users')
  }
  return context.prisma.updateUser({
    data: _.pick(args, ['name', 'email', 'birthday', 'isAdmin']),
    where: { id: args.id }
  })
}

async function login (parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  console.dir(user)
  const token = jwt.sign(user, APP_SECRET)

  return {
    token,
    user
  }
}

async function createAccount (parent, args, context, info) {
  const currentUser = getUser(context)
  if (!currentUser.isAdmin) {
    throw new Error('Only administrators can create accounts')
  }
  return context.prisma.createAccount({
    name: args.name,
    allowance: (args.allowance) ? args.allowance : 0,
    interest: (args.interest) ? args.interest : 0,
    balance: 0,
    owner: { connect: { id: args.ownerId } }
  })
}

async function updateAccount (parent, args, context, info) {
  const currentUser = getUser(context)
  if (!currentUser.isAdmin) {
    throw new Error('Only administrators can edit accounts')
  }
  return context.prisma.updateAccount({
    data: _.pick(args, ['name', 'allowance', 'interest']),
    where: { id: args.id }
  })
}

async function reconcileAccount (parent, args, context, info) {
  const currentUser = getUser(context)
  if (!currentUser.isAdmin) {
    throw new Error('Only administrators can reconcile accounts')
  }
  const transactions = await context.prisma.transactions({ where: { account: { id: args.id } } })
  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
  return context.prisma.updateAccount({
    data: { balance: balance },
    where: { id: args.id }
  })
}

async function addTransaction (parent, args, context, info) {
  const currentUser = getUser(context)
  if (!currentUser.isAdmin) {
    throw new Error('Only administrators can add transactions')
  }
  const account = await context.prisma.account({ id: args.accountId })
  await context.prisma.updateAccount({
    data: { balance: account.balance + args.amount },
    where: { id: args.accountId }
  })
  return context.prisma.createTransaction({
    description: args.description,
    amount: args.amount,
    account: { connect: { id: account.id } }
  })
}

export default {
  createUser,
  updateUser,
  login,
  createAccount,
  updateAccount,
  addTransaction,
  reconcileAccount
}
