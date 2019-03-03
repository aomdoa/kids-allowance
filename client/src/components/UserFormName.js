import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class UserFormName extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.validateName = this.validateName.bind(this)
    this.state = {
      name: this.props.name,
      nameError: null
    }
  }

  validateName () {
    const { name } = this.state
    let nameError = null
    if (name.length < 4) {
      nameError = 'Name must be longer than 3 characters'
    }
    this.setState({ nameError: nameError })
    if (this.props.onValidate) {
      this.props.onValidate(nameError === null)
    }
  }

  onChange (e) {
    this.setState({ name: e.target.value })
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render () {
    const { name, nameError } = this.state
    return (
      <div>
        <label>Name</label>
        <input
          value={name}
          type="text"
          onChange={this.onChange}
          onBlur={this.validateName}
          placeholder="Name"
        />
        {nameError}
      </div>
    )
  }
}

UserFormName.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onValidate: PropTypes.func
}
