import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class UserList extends Component {
  render () {
    return (
      <div>
        UserList
        <Link to="/users/create">Create User</Link>
      </div>
    )
  }
}
