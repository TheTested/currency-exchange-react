import React from 'react'
import './CurrencySelect.css';

export default function CurrencySelector(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onCurrencyChange
  } = props
  return (
    <div>
      <select value={selectedCurrency} onChange={onCurrencyChange}>
      <option value="" selected disabled hidden>Choose here</option>
        {currencyOptions.map(option => (
          <option key={option[1]} value={option[1]}>{option[1]} - {option[0]}</option>
        ))}
        
      </select>
    </div>
  )
}