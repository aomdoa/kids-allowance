import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class UserFormPassword extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.state = {
      password: '',
      passwordCheck: '',
      passwordError: null,
      psswordCheckError: null
    }
  }

  onChange (e) {
    this.setState({ password: e.target.value })
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  validatePassword () {
    const { password, passwordCheck } = this.state
    let passwordError = null
    let passwordCheckError = null

    if (password.length < 6) {
      passwordError = 'Password must be longer than 6 characters'
    } else if (passwordCheck.length > 0 && password !== passwordCheck) {
      passwordCheckError = 'Passwords do not match'
    }
    this.setState({ passwordError: passwordError, passwordCheckError: passwordCheckError })
    if (this.props.onValidate) {
      this.props.onValidate(passwordError === null && passwordCheckError === null)
    }
  }

  render () {
    const { password, passwordCheck, passwordError, passwordCheckError } = this.state
    return (
      <div>
        <div>
          <label>Password</label>
          <input
            value={password}
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
            onBlur={this.validatePassword}
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
            onBlur={this.validatePassword}
            placeholder="Password Again"
          />
          {passwordCheckError}
        </div>
      </div>
    )
  }
}

UserFormPassword.propTypes = {
  onChange: PropTypes.func,
  onValidate: PropTypes.func
}
