import React, { Component } from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'

export default class UserFormEmail extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.state = {
      email: this.props.email,
      emailError: null
    }
  }

  onBlur () {
    const { email } = this.state
    let emailError = null
    if (!validator.isEmail(email)) {
      emailError = 'Valid email must be entered'
    }
    this.setState({ emailError: emailError })
    if (this.props.onValidate) {
      this.props.onValidate(emailError === null)
    }
  }

  onChange (e) {
    this.setState({ email: e.target.value })
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render () {
    const { email, emailError } = this.state
    return (
      <div>
        <label>Email</label>
        <input
          value={email}
          type="text"
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder="Email Address"
        />
        {emailError}
      </div>
    )
  }
}

UserFormEmail.propTypes = {
  email: PropTypes.string,
  onChange: PropTypes.func,
  onValidate: PropTypes.func
}
