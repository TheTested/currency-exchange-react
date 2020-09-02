import React from 'react'

export default function CurrencySelector(props) {
  return (
    <div>
      <select value={selectedCurrency} onChange={onCurrencyChange}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
        
      </select>
    </div>
  )
}
