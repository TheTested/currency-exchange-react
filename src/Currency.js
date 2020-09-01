import React from 'react'

export default function Currency(props) {
  const {
    currencyOptions
  } = props
  return (
    <div>
      <input type="number" />
      <select>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
        
      </select>
    </div>
  )
}
