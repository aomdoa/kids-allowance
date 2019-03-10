import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import _ from 'lodash'
import UserForm from './UserForm'
import { GET_USER, MODIFY_USER } from '../query'

export default class UserEdit extends Component {
  render () {
    const { id } = this.props.match.params
    return (
      <div>
        <Query query={GET_USER} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching User</div>
            if (error) return <div>ERROR</div>
            return (
              <Mutation mutation={MODIFY_USER} key={id}>
                {(mutate, { error }) => (
                  <div>
                    <Formik
                      initialValues={_.assign(data.user, { password: '', passwordCheck: '' })}
                      onSubmit={values => {
                        if (values.password.length === 0) {
                          delete values.password
                        }
                        mutate({ variables: values })
                      }}
                    >
                      {(formikProps) => (
                        <UserForm {...formikProps}/>
                      )}
                    </Formik>
                  </div>
                )}
              </Mutation>
            )
          }}
        </Query>
      </div>
    )
  }
}

UserEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}
