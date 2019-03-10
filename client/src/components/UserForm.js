import React, { Component } from 'react'
import { Form, Field, ErrorMessage } from 'formik'
import DatePicker from 'react-datepicker'
import validator from 'validator'
import moment from 'moment'
import PropTypes from 'prop-types'
import { getUser } from '../utils'
import 'react-datepicker/dist/react-datepicker.css'

const validateName = (value) => {
  return value.length > 3 ? null : 'Name must be longer than 3 characters'
}

const validateEmail = (value) => {
  return validator.isEmail(value) ? null : 'Valid email must be entered'
}

const validateBirthday = (value) => {
  const birthdayDate = moment(value)
  if (!birthdayDate.isValid()) {
    return 'Birthday must be entered as YYYY-mm-dd'
  } else if (birthdayDate.isAfter(moment())) {
    return 'Birthday cannot be in the future'
  }
}

const validatePassword = (value) => {
  return (value.length === 0 || value.length > 6) ? null : 'Password must be longer than 6 characters'
}

const validatePasswordCheck = (value) => {
  return (value === document.getElementById('password').value) ? null : 'Passwords must match'
}

export default class UserForm extends Component {
  render () {
    const currentUser = getUser()
    const userId = this.props.values.id

    return (
      <Form>
        <fieldset>
          <legend>Create User</legend>
          <div>
            <label htmlFor="name">Name:</label>
            <Field name="name" validate={validateName} />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" validate={validateEmail} />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="birthday">Birthday:</label>
            <Field name="birthday" validate={validateBirthday}>
              {({ field, form }) => (
                <DatePicker
                  onChange={date => form.setFieldValue('birthday', moment(date).format('YYYY-MM-DD'))}
                  showYearDropdown
                  selected={moment(field.value).toDate()}
                  dateFormat='yyyy-MM-dd'
                />
              )}
            </Field>
            <ErrorMessage name="birthday" component="div" />
          </div>
          {currentUser.isAdmin && (
            <div>
              <label htmlFor="isAdmin">Is Admin:</label>
              <Field name="isAdmin">
                {({ field, form }) => (
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      form.setFieldValue('isAdmin', event.target.checked)
                    }}
                    checked={field.value}
                  />
                )}
              </Field>
            </div>
          )}
          {(currentUser.isAdmin || currentUser.id === userId) && (
            <div>
              <div>
                <label htmlFor="password">Password</label>
                <Field id="password" name="password" type="password" validate={validatePassword} />
                <ErrorMessage name="password" component="div" />
              </div>
              <div>
                <label htmlFor="passwordCheck">Password Again</label>
                <Field name="passwordCheck" type="password" validate={validatePasswordCheck} />
                <ErrorMessage name="passwordCheck" component="div" />
              </div>
            </div>
          )}
          <button type="submit">
              Submit
          </button>
        </fieldset>
      </Form>
    )
  }
}

UserForm.propTypes = {
  values: PropTypes.shape({
    id: PropTypes.string
  })
}
