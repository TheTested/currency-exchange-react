import React from 'react';
import CurrencySelector from './CurrencySelector';

export default function Currency(props) {
  const {
    currencyOptions,
    selectedFromCurrency,
    selectedToCurrency,
    onCurrencyChange,
    amount,
    onAmountChange
  } = props
  return (
    <div>
      <input type="number" value={amount} onChange={onAmountChange}/>

      
    </div>
  )
}
