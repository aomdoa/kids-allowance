import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { AUTH_TOKEN } from '../constants'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  async _procToken (data) {
    const { token } = data.login
    window.localStorage.setItem(AUTH_TOKEN, token)
    this.props.history.push('/accounts')
  }

  render () {
    const { email, password } = this.state
    return (
      <div>
        <form>
          <fieldset>
            <legend>Login</legend>
            <div>
              <label>Email</label>
              <input
                value={email}
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="Email Address"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                value={password}
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Password"
              />
            </div>
          </fieldset>
          <div>
            <Mutation mutation={LOGIN_MUTATION} variables={{ email, password }} onCompleted={data => this._procToken(data)}>
              {mutation => (
                <input type="button" value="Login" onClick={mutation} />
              )}
            </Mutation>
          </div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  history: PropTypes.object
}
