import React from 'react'

export default function CurrencyAnswer(props) {
  const { 
    selectedCurrency,
    amount
  } = props
  return (
    <div>
      <h1>{selectedCurrency}</h1>
      <h1>{amount}</h1>
    </div>
  )
}
