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

export default class UserDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      birthday: '1981-05-05',
      password: '',
      isAdmin: false,
      isNameValid: false,
      isEmailValid: false,
      isBirthdayValid: false,
      isPasswordValid: false
    }
  }

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
