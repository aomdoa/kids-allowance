import React, { Component } from 'react'
import gql from 'graphql-tag'
import UserForm from './UserForm'

const CREATE_USER = gql`
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
// https://stackoverflow.com/questions/27864951/how-to-access-childs-state-in-react
export default class UserCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  render () {
    return (
      <div>
        <button onClick={e => window.alert(this.state.name)}>Button</button>
        <UserForm name={this.state.name} />
      </div>
    )
  }
  /* <Mutation mutation={CREATE_USER} variables={{ name, email, birthday, isAdmin, password }}>
              {(mutation, { error }) => (
                <div>
                  <input
                    type="button"
                    value="Create"
                    disabled={!name || !email || !birthday || !password || !passwordCheck || nameError || emailError || birthdayError || passwordError || passwordCheckError}
                    onClick={mutation}
                  />
                  {error && <p>error</p>}
                </div>
              )}
            </Mutation> */
}
