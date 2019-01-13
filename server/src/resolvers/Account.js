function user (parent, args, context) {
  return context.prisma.account({ id: parent.id }).owner()
}

export default {
  user
}
