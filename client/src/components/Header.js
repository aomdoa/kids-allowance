import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
  render () {
    const authToken = window.localStorage.getItem(AUTH_TOKEN)
    return (
      <div>
        {authToken ? (
          <div>
            <Link to="/accounts">Accounts</Link>
            <Link to="/users">Users</Link>
            <div onClick={() => {
              window.localStorage.removeItem(AUTH_TOKEN)
              this.props.history.push('/')
            }}>logout</div>
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
