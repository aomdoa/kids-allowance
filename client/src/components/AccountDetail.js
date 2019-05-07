import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import NumberFormat from 'react-number-format'
import TransactionItem from './TransactionItem'
import { GET_ACCOUNT, CREATE_TRANSACTION, GET_TRANSACTIONS } from '../query'

const validateDescription = (value) => {
  return value.length > 3 ? null : 'Please enter a description for the transaction'
}

const validateAmount = (value) => {
  return value > 0 ? null : 'Please enter a valid amount over 0'
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
                  <Mutation mutation={CREATE_TRANSACTION}>
                    {(mutate, { error }) => (
                      <Formik
                        initialValues={{ amount: '', description: '' }}
                        onSubmit={(values, { resetForm }) => {
                          let amount = Number.parseFloat(values.amount)
                          if (values.debit) {
                            amount = -amount
                          }
                          data.account.balance += amount
                          mutate({ variables: {
                            accountId: data.account.id,
                            amount: amount,
                            description: values.description
                          } })
                          resetForm()
                        }}
                      >{({ values, submitForm }) => (
                          <Form>
                            <fieldset>
                              <legend>Transaction</legend>
                              <div>
                                <label htmlFor="amount">Amount:</label>
                                <Field name="amount" validate={validateAmount} />
                                <ErrorMessage name="amount" component="div" />
                              </div>
                              <div>
                                <label htmlFor="description">Description:</label>
                                <Field name="description" validate={validateDescription} />
                                <ErrorMessage name="description" component="div" />
                              </div>
                              <div>
                                <input type="button" value="Debit" onClick={(e) => {
                                  values.debit = true
                                  submitForm()
                                }}
                                />
                              </div>
                              <div><input type="button" value="Credit" onClick={(e) => submitForm() } /></div>
                            </fieldset>
                          </Form>
                        )}
                      </Formik>
                    )}
                  </Mutation>
                </div>
                <div>
                  <div>Transactions:</div>
                  <div>
                    <Query query={GET_TRANSACTIONS} variables={{ accountId: data.account.id, first: 10 }}>
                      {({ loading, error, data }) => {
                        // https://github.com/ecerroni/apollo-cache-updater
                        if (loading) return <div>Fetching Account</div>
                        if (error) return <div>ERROR</div>
                        return (
                          <div>{data.transactions.map(transaction => <TransactionItem key={transaction.id} transaction={transaction} />)}</div>
                        )
                      }}
                    </Query>
                  </div>
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
