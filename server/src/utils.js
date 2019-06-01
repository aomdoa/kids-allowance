import jwt from 'jsonwebtoken'
import { APP_SECRET } from './config'

export function getUser (context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    return jwt.verify(token, APP_SECRET)
  }

  throw new Error('Not authenticated')
}

export async function transaction (prisma, account, amount, description) {
  await prisma.updateAccount({
    data: { balance: account.balance + amount },
    where: { id: account.id }
  })
  await prisma.createTransaction({
    description: description,
    amount: amount,
    account: { connect: { id: account.id } }
  })
}
