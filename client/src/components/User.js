import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class User extends Component {
  render () {
    const { id, name, birthday, email } = this.props.user
    return (
      <div>
        <div><Link to={`/users/edit/${id}`}>{name}</Link></div>
        <div>{birthday}</div>
        <div>{email}</div>
      </div>
    )
  }
}

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
}
