import React from 'react'

export default function Currency(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onCurrencyChange,
    amount,
    onAmountChange
  } = props
  return (
    <div>
      <input type="number" value={amount} onChange={onAmountChange}/>
      <select value={selectedCurrency} onChange={onCurrencyChange}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
        
      </select>
    </div>
  )
}
