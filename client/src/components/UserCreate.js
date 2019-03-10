import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Formik } from 'formik'
import UserForm from './UserForm'
import { CREATE_USER } from '../query'

export default class UserCreate extends Component {
  render () {
    return (
      <Mutation mutation={CREATE_USER}>
        {(mutate, { error }) => (
          <Formik
            initialValues={{ name: '', email: '', birthday: '2010-01-01', password: '', passwordCheck: '' }}
            onSubmit={values => mutate({ variables: values })}
          >
            {(formikProps) => (
              <UserForm {...formikProps}/>
            )}
          </Formik>
        )}
      </Mutation>
    )
  }
}
