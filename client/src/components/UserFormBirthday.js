import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

export default class UserFormBirthday extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.validateBirthday = this.validateBirthday.bind(this)
    this.state = {
      birthday: this.props.birthday,
      birthdayError: null
    }
  }

  onChange (date) {
    const birthday = moment(date).format('YYYY-MM-DD')
    this.setState({ birthday: birthday })
    if (this.props.onChange) {
      this.props.onChange(birthday)
    }
  }

  validateBirthday () {
    const { birthday } = this.state
    const birthdayDate = moment(birthday)
    let birthdayError = null
    if (!birthdayDate.isValid()) {
      birthdayError = 'Birthday must be entered as YYYY-mm-dd'
    } else if (birthdayDate.isAfter(moment())) {
      birthdayError = 'Birthday cannot be in the future'
    }
    this.setState({ birthdayError: birthdayError })
    if (this.props.onValidate) {
      this.props.onValidate(birthdayError === null)
    }
  }

  render () {
    const { birthday, birthdayError } = this.state
    return (
      <div>
        <label>Birthday</label>
        <DatePicker
          onChange={this.onChange}
          onBlur={this.validateBirthday}
          selected={moment(birthday).toDate()}
          dateFormat='yyyy-MM-dd'
        />
        {birthdayError}
      </div>
    )
  }
}

UserFormBirthday.propTypes = {
  birthday: PropTypes.string,
  onChange: PropTypes.func,
  onValidate: PropTypes.func
}
