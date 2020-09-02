import React from 'react'
import CurrencySelector from './CurrencySelector';

export default function Currency(props) {
  const {
    currencyOptions,
    selectedCurrency,
    selectedCurrency2,
    onCurrencyChange,
    onCurrencyChange2,
    amount,
    onAmountChange
  } = props

  return (
    <div>
      <input type="number" value={amount} onChange={onAmountChange}/>
      
      <CurrencySelector
        currencyOptions = {currencyOptions}
        selectedCurrency = {selectedCurrency}
        onCurrencyChange = {onCurrencyChange}
       />

      <CurrencySelector
        currencyOptions = {currencyOptions}
        selectedCurrency2 = {selectedCurrency2}
        onCurrencyChange = {onCurrencyChange2}
       />
        
    </div>
    
  )
}
