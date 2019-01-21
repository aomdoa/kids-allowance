import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AccountList extends Component {
  render () {
    return (
      <div>
        Accounts
        <Link to="/accounts/create">Create Account</Link>
      </div>
    )
  }
}
