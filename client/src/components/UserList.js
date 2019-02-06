import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import User from './User'

const GET_USERS = gql`
  {
    users {
      id
      name
      email
      birthday
      isAdmin
    }
  }
`

export default class UserList extends Component {
  render () {
    return (
      <div>
        <Query query={GET_USERS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching Users</div>
            if (error) return <div>ERROR</div>
            return (
              <div>{data.users.map(user => <User key={user.id} user={user} />)}</div>
            )
          }}
        </Query>
        <Link to="/users/create">Create User</Link>
      </div>
    )
  }
}
