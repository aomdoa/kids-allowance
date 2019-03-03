import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import UserFormName from './UserFormName'
import UserFormEmail from './UserFormEmail'
import UserFormBirthday from './UserFormBirthday'
import UserFormPassword from './UserFormPassword'

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
export default class UserCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      birthday: '1981-05-05',
      password: '',
      isAdmin: false,
      isNameValid: false,
      isEmailValid: false,
      isBirthdayValid: false,
      isPasswordValid: false
    }
  }

  render () {
    const { name, email, birthday, isAdmin, password, isNameValid, isEmailValid, isBirthdayValid, isPasswordValid } = this.state
    return (
      <div>
        <form>
          <fieldset>
            <legend>Create User</legend>
            <UserFormName name={name} onChange={(value) => this.setState({ name: value })} onValidate={(valid) => this.setState({ isNameValid: valid })} />
            <UserFormEmail email={email} onChange={(value) => this.setState({ email: value })} onValidate={(valid) => this.setState({ isEmailValid: valid })} />
            <UserFormBirthday birthday={birthday} onChange={(value) => this.setState({ birthday: value })} onValidate={(valid) => this.setState({ isBirthdayValid: valid })} />
            <div>
              <label>Is Administrator</label>
              <input
                value={isAdmin}
                type="checkbox"
                onClick={() => this.setState({ isAdmin: !isAdmin })}
              />
            </div>
            <UserFormPassword onChange={(value) => this.setState({ password: value })} onValidate={(valid) => this.setState({ isPasswordValid: valid })} />
          </fieldset>
        </form>
        <Mutation mutation={CREATE_USER} variables={{ name, email, birthday, isAdmin, password }}>
          {(mutation, { error }) => (
            <div>
              <input
                type="button"
                value="Create"
                disabled={!isNameValid && !isEmailValid && !isBirthdayValid && !isPasswordValid}
                onClick={mutation}
              />
              {error && <p>error</p>}
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}
