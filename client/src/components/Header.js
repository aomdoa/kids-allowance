import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { getUser, logout } from '../utils'

class Header extends Component {
  render () {
    const user = getUser()
    return (
      <div>
        {user ? (
          <div>
            <Link to='/accounts'>Accounts</Link>
            {user.isAdmin && (<Link to='/users'>Users</Link>)}
            <Link to={`/users/edit/${user.id}`}>My Account</Link>
            <a href="javascript:;" onClick={() => {
              logout()
              this.props.history.push('/')
            }}>Logout</a>
          </div>
        ) : null}
      </div>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object
}

export default withRouter(Header)
