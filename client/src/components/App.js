import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'
import Header from './Header'
import Login from './Login'
import AccountList from './AccountList'
import AccountCreate from './AccountCreate'
import AccountDetail from './AccountDetail'
import UserList from './UserList'
import UserCreate from './UserCreate'
import UserEdit from './UserEdit'

export default class App extends Component {
  render () {
    const authToken = window.localStorage.getItem(AUTH_TOKEN)
    return (
      <div style={{ width: '1600px' }}>
        <Header />
        <Switch>
          <Route exact path="/" render={() => authToken ? <Redirect to="/accounts" /> : <Redirect to="/login" /> } />
          <Route exact path="/login" component={Login} />
          <Route exact path="/accounts" component={AccountList} />
          <Route exact path="/accounts/create" component={AccountCreate} />
          <Route exact path="/accounts/:id" component={AccountDetail} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/create" component={UserCreate} />
          <Route exact path="/users/edit/:id" component={UserEdit} />
        </Switch>
      </div>
    )
  }
}
