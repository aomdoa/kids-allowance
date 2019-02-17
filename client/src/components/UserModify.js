import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import UserForm from './UserForm'

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      email
      birthday
      isAdmin
    }
  }
`

export default class UserModify extends Component {
  render () {
    const { id } = this.props.match.params
    return (
      <div>
        <Query query={GET_USER} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching User</div>
            if (error) return <div>ERROR</div>
            return (
              <UserForm {...data.user } />
            )
          }}
        </Query>
      </div>
    )
  }
}
