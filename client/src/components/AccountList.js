import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import NumberFormat from 'react-number-format'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { GET_ALL_ACCOUNTS } from '../query'

export default class AccountList extends Component {
  render () {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Query query={GET_ALL_ACCOUNTS}>
              {({ loading, error, data }) => {
                if (loading) return <TableRow><TableCell>Fetching Users</TableCell></TableRow>
                if (error) return <TableRow><TableCell>ERROR</TableCell></TableRow>
                return data.accounts.map(account => {
                  return (
                    <TableRow key={account.id}>
                      <TableCell><Link to={`/users/edit/${account.user.id}`}>{account.user.name}</Link></TableCell>
                      <TableCell><Link to={`/accounts/${account.id}`}>{account.name}</Link></TableCell>
                      <TableCell><NumberFormat value={account.balance} displayType={'text'} thousandSeparator={' '} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></TableCell>
                    </TableRow>
                  )
                })
              }}
            </Query>
          </TableBody>
        </Table>
        <Link to="/accounts/create">Create Account</Link>
      </div>
    )
  }
}
