import gql from 'graphql-tag'

export const GET_USERS = gql`
  {
    users {
      id
      name
      email
      birthday
      isAdmin
    }
  } 
`

export const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      email
      birthday
      isAdmin
    }
  }
`

export const MODIFY_USER = gql`
  mutation UpdateUser($id: ID!, $name: String, $email: EmailAddress, $birthday: GraphQLDate, $isAdmin: Boolean, $password: String) {
    updateUser(id: $id, name: $name, email: $email, birthday: $birthday, isAdmin: $isAdmin, password: $password) {
      id
      name
      email
      birthday
      isAdmin
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: EmailAddress!, $password: String!, $birthday: GraphQLDate, $isAdmin: Boolean) {
    createUser(name: $name, email: $email, password: $password, birthday: $birthday, isAdmin: $isAdmin) {
      id
      name
      email
      birthday
      isAdmin
    }  
  }
`

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $ownerId: ID!, $allowance: NonNegativeFloat!, $interest: NonNegativeFloat!) {
    createAccount(name: $name, ownerId: $ownerId, allowance: $allowance, interest: $interest) {
      id
      name
      balance
      allowance
      interest
    }
  }
`

export const GET_ALL_ACCOUNTS = gql`
  {
    accounts {
      id
      name
      balance
      allowance
      interest
      user {
        id
        name
      }
    }
  }
`

export const GET_ACCOUNT = gql`
  query($id: ID!) {
    account(id: $id) {
      id
      name
      balance
      allowance
      interest
      user {
        id
        name
      }
    }
  }
`

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($accountId: ID!, $description: String!, $amount: Float!) {
    addTransaction(accountId: $accountId, description: $description, amount: $amount) {
      id
    }
  }
`

export const GET_TRANSACTIONS = gql`
  query($accountId: ID!, $first: Int, $skip: Int) {
    transactions(accountId: $accountId, first: $first, skip: $skip) {
      id
      description
      amount
      date
    }
  }
`
