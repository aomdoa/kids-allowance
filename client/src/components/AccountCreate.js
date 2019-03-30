import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Formik } from 'formik'
import AccountForm from './AccountForm'
import { INTEREST, ALLOWANCE } from '../constants'
import { CREATE_ACCOUNT } from '../query'

export default class AccountCreate extends Component {
  render () {
    return (
      <Mutation mutation={CREATE_ACCOUNT}>
        {(mutate, { error }) => (
          <Formik
            initialValues={{ name: '', allowance: ALLOWANCE, interest: INTEREST }}
            onSubmit={values => {
              console.dir(values)
              mutate({ variables: values })
            }}
          >
            {(formikProps) => (
              <AccountForm {...formikProps}/>
            )}
          </Formik>
        )}
      </Mutation>
    )
  }
}
