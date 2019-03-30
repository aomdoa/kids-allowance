import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import UserItem from './UserItem'
import { GET_USERS } from '../query'

export default class UserList extends Component {
  render () {
    return (
      <div>
        <Query query={GET_USERS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching Users</div>
            if (error) return <div>ERROR</div>
            return (
              <div>{data.users.map(user => <UserItem key={user.id} user={user} />)}</div>
            )
          }}
        </Query>
        <Link to="/users/create">Create User</Link>
      </div>
    )
  }
}
