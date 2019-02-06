import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import validator from 'validator'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

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

export default class CreateUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      birthday: moment().format('YYYY-MM-DD'),
      isAdmin: false,
      password: '',
      passwordCheck: '',
      nameError: null,
      emailError: null,
      brithdayError: null,
      passwordError: null,
      psswordCheckError: null
    }
  }

  validateName () {
    const { name } = this.state
    this.setState({
      nameError: name.length > 3 ? null : 'Name must be longer than 3 characters'
    })
  }

  validateEmail () {
    const { email } = this.state
    this.setState({
      emailError: validator.isEmail(email) ? null : 'Valid email must be entered'
    })
  }

  validateBirthday () {
    const { birthday } = this.state
    const birthdayDate = moment(birthday)
    if (!birthdayDate.isValid()) {
      this.setState({ birthdayError: 'Birthday must be entered as YYYY-mm-dd' })
    } else if (birthdayDate.isAfter(moment())) {
      this.setState({ birthdayError: 'Birthday cannot be in the future' })
    } else {
      this.setState({ birthdayError: null })
    }
  }

  validatePassword () {
    const { password, passwordCheck } = this.state
    if (password.length < 6) {
      this.setState({ passwordError: 'Password must be longer than 6 characters' })
    } else if (passwordCheck.length > 0 && password !== passwordCheck) {
      this.setState({ passwordCheckError: 'Passwords do not match', passwordError: null })
    } else {
      this.setState({ passwordError: null, passwordCheckError: null })
    }
  }

  render () {
    const { name, email, birthday, isAdmin, password, passwordCheck, nameError, emailError, birthdayError, passwordError, passwordCheckError } = this.state
    return (
      <div>
        <form>
          <fieldset>
            <legend>Create User</legend>
            <div>
              <label>Name</label>
              <input
                value={name}
                type="text"
                onChange={e => this.setState({ name: e.target.value })}
                onBlur={() => this.validateName()}
                placeholder="Name"
              />
              {nameError}
            </div>
            <div>
              <label>Email</label>
              <input
                value={email}
                type="text"
                onChange={e => this.setState({ email: e.target.value })}
                onBlur={() => this.validateEmail()}
                placeholder="Email Address"
              />
              {emailError}
            </div>
            <div>
              <label>Birthday</label>
              <DatePicker
                onChange={date => this.setState({ birthday: moment(date).format('YYYY-MM-DD') })}
                onBlur={() => this.validateBirthday()}
                selected={moment(birthday).toDate()}
                dateFormat='yyyy-MM-dd'
              />
              {birthdayError}
            </div>
            <div>
              <label>Is Administrator</label>
              <input
                value={isAdmin}
                type="checkbox"
                onChange={e => this.setState({ isAdmin: e.target.value })}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                value={password}
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                onBlur={() => this.validatePassword()}
                placeholder="Password"
              />
              {passwordError}
            </div>
            <div>
              <label>Password Again</label>
              <input
                value={passwordCheck}
                type="password"
                onChange={e => this.setState({ passwordCheck: e.target.value })}
                onBlur={() => this.validatePassword()}
                placeholder="Password Again"
              />
              {passwordCheckError}
            </div>
          </fieldset>
          <div>
            <Mutation mutation={CREATE_USER} variables={{ name, email, birthday, isAdmin, password }}>
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
            </Mutation>
          </div>
        </form>
      </div>
    )
  }
}
