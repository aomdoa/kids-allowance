import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'
import Header from './Header'
import Login from './Login'
import AccountList from './AccountList'
import CreateAccount from './CreateAccount'
import UserList from './UserList'
import CreateUser from './CreateUser'

export default class App extends Component {
  render () {
    const authToken = window.localStorage.getItem(AUTH_TOKEN)
    return (
      <div>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" render={() => authToken ? <Redirect to="/accounts" /> : <Redirect to="/login" /> } />
            <Route exact path="/login" component={Login} />
            <Route exact path="/accounts" component={AccountList} />
            <Route exact path="/accounts/create" component={CreateAccount} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/users/create" component={CreateUser} />
          </Switch>
        </div>
      </div>
    )
  }
}
