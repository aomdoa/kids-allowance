import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_USER } from '../query'

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
