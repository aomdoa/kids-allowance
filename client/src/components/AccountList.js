import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_ACCOUNTS } from '../query'

export default class AccountList extends Component {
  render () {
    return (
      <div>
        <Query query={GET_ACCOUNTS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching Users</div>
            if (error) return <div>ERROR</div>
            return (
              <div>
                {data.accounts.map(account => {
                  return (
                    <div key={account.id}>
                      <div><Link to={`/users/edit/${account.user.id}`}>{account.user.name}</Link></div>
                      <div>{account.name}</div>
                      <div>{account.balance}</div>
                      <div>Credit</div>
                      <div>Debit</div>
                    </div>
                  )
                })}
              </div>
            )
          }}
        </Query>
        <Link to="/accounts/create">Create Account</Link>
      </div>
    )
  }
}
