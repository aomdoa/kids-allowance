function account (parent, args, context) {
  return context.prisma.transaction({ id: parent.id }).account()
}

function date (parent, args, context) {
  return new Date(parent.createdAt)
}

export default {
  account,
  date
}
