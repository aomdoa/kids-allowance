import React, { Component } from 'react'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import NumberFormat from 'react-number-format'
import { GET_ACCOUNT } from '../query'

const validateDescription = (value) => {
  return value.length > 3 ? null : 'Please enter a description for the transaction'
}

export default class AccountDetail extends Component {
  render () {
    const { id } = this.props.match.params
    return (
      <div>
        <Query query={GET_ACCOUNT} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching Account</div>
            if (error) return <div>ERROR</div>
            return (
              <div>
                <div>{data.account.name} for {data.account.user.name}</div>
                <div>
                  <div>Balance:</div>
                  <div><NumberFormat value={data.account.balance} displayType={'text'} thousandSeparator={' '} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></div>
                </div>
                <div>
                  <Formik
                    initialValues={{ amount: '', description: '' }}
                    onSubmit={values => {
                      console.dir(values)
                    }}
                  >{({ values, submitForm }) => (
                      <Form>
                        <fieldset>
                          <legend>Transaction</legend>
                          <div>
                            <label htmlFor="amount">Amount:</label>
                            <Field name="amount" />
                            <ErrorMessage name="amount" component="div" />
                          </div>
                          <div>
                            <label htmlFor="description">Description:</label>
                            <Field name="description" validate={validateDescription} />
                            <ErrorMessage name="description" component="div" />
                          </div>
                          <div>
                            <input type="button" value="Debit" onClick={(e) => {
                              values.amount = -values.amount
                              submitForm()
                            }}
                            />
                          </div>
                          <div><input type="button" value="Credit" onClick={(e) => submitForm() } /></div>
                        </fieldset>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

AccountDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}
