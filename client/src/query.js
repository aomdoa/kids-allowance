import gql from 'graphql-tag'

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
