import React, { Component } from 'react'
import { Form, Field, ErrorMessage } from 'formik'
import { Query } from 'react-apollo'
import { GET_USERS } from '../query'

const validateName = (value) => {
  return value.length > 3 ? null : 'Name must be longer than 3 characters'
}

const validateRate = (value) => {
  return value >= 0 ? null : 'The rate must be a valid non-negative number'
}

export default class AccountForm extends Component {
  render () {
    return (
      <Form>
        <fieldset>
          <legend>Create Account</legend>
          <div>
            <label htmlFor="ownerId">User:</label>
            <Query query={GET_USERS}>
              {({ data }) => {
                if (data && data.users) {
                  return (
                    <Field component="select" name="ownerId">
                      <option>-- Select a User --</option>
                      {data.users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </Field>
                  )
                } else {
                  return null
                }
              }}
            </Query>
          </div>

          <div>
            <label htmlFor="name">Name:</label>
            <Field name="name" validate={validateName} />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label htmlFor="allowance">Allowance Rate (year):</label>
            <Field name="allowance" validate={validateRate} />
            <ErrorMessage name="allowance" component="div" />
          </div>

          <div>
            <label htmlFor="interest">Interest (month):</label>
            <Field name="interest" validate={validateRate} />
            <ErrorMessage name="interest" component="div" />
          </div>

          <button type="submit">
            Submit
          </button>
        </fieldset>
      </Form>
    )
  }
}
