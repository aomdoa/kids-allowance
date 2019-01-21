import { getUser } from '../utils'

async function users (parent, args, context) {
  getUser(context)
  return context.prisma.users()
}

async function accounts (parent, args, context) {
  const currentUser = getUser(context)
  if (currentUser.isAdmin && !args.userId) {
    return context.prisma.accounts()
  } else if (!args.userId) {
    args.userId = currentUser.userId
  }
  return context.prisma.accounts({ where: { owner: { id: args.userId } } })
}

async function transactions (parent, args, context) {
  const currentUser = getUser(context)
  const account = context.prisma.account({ id: args.accountId })
  if (currentUser.id !== account.owner.id && !currentUser.isAdmin) {
    throw new Error('Only admin can look at other accounts')
  }
  return context.prisma.transactions({
    where: { account: { id: args.accountId } },
    skip: args.skip,
    first: args.first,
    orderBy: 'createdAt_DESC'
  })
}

export default {
  users,
  accounts,
  transactions
}
