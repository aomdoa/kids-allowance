import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

export default class TransactionItem extends Component {
  render () {
    const { description, amount, date } = this.props.transaction
    return (
      <div>
        <div>{(amount > 0) ? 'Credit' : 'Debit'}</div>
        <div>{description}</div>
        <div><NumberFormat value={Math.abs(amount)} displayType={'text'} thousandSeparator={' '} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></div>
        <div>{date}</div>
      </div>
    )
  }
}

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
  })
}
