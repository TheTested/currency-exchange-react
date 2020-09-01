import React, { useEffect, useState } from 'react';
import './App.css';
import Currency from './Currency';

const Base = 'https://api.exchangeratesapi.io/latest'

function App() {


  const [currencyOptions, setCurrencyOptions] = useState([])

  useEffect(() => {
    fetch(Base)
      .then(res => res.json())
      .then(data => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      })
  }, [])
  return (
    <>
       <h1>Convert</h1>
       <Currency 
        currencyOptions = {currencyOptions}
       />
       <div>=</div>
       <Currency 
        currencyOptions = {currencyOptions}
       />
    </>
  );
}

export default App;
