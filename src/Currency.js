import React from 'react'
import CurrencySelector from './CurrencySelector';
import './CurrencySelect.css';

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
      <div class="from">
        <div>
          <h3>amount</h3>
          <input type="number" value={amount} onChange={onAmountChange}/>
        </div>
        <div>
          <h3>from</h3>
          <CurrencySelector
            currencyOptions = {currencyOptions}
            selectedCurrency = {selectedCurrency}
            onCurrencyChange = {onCurrencyChange}
          />
        </div>
      </div>

      <div>
        <h3>to</h3>
        <CurrencySelector
          currencyOptions = {currencyOptions}
          selectedCurrency2 = {selectedCurrency2}
          onCurrencyChange = {onCurrencyChange2}
        />
      </div>
        
    </div>
    
  )
}
