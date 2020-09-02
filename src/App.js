import React, { useEffect, useState } from 'react';
import './App.css';
import Currency from './Currency';

const Base = 'https://api.exchangeratesapi.io/latest'



function App() {


  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCur, setFromCur] = useState()
  const [toCur, setToCur] = useState()
  const [exRate, setExRate] = useState()
  const [fromAmount, setFromAmount] = useState(1)
  const [toAmount, setToAmount] = useState()

  function changeFromAmount(e) {
    setFromAmount(e.target.value)
    setToAmount(e.target.value*exRate)
  }

  function changeToAmount(e) {
    setToAmount(e.target.value)
    setFromAmount(e.target.value/exRate)
  }

  function buttonclick() {
    console.log("hi");
  }

  useEffect(() => {
    fetch(Base)
      .then(res => res.json())
      .then(data => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCur(data.base)
        setToCur(Object.keys(data.rates)[0])
        setExRate(data.rates[Object.keys(data.rates)[0]])
        setToAmount(data.rates[Object.keys(data.rates)[0]])
      })
  }, [])

  //CHANGE FROM CURRENCY
  useEffect(() => {
    if (fromCur != null && toCur != null) {
      fetch(`${Base}?base=${fromCur}&symbols=${toCur}`)
        .then(res => res.json())
        .then(data => {setExRate(data.rates[toCur])
                        setToAmount(fromAmount*data.rates[toCur])})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCur, toCur])


  return (
    <>
       <h1>Convert</h1>
       <Currency 
        currencyOptions = {currencyOptions}
        selectedCurrency = {fromCur}
        onCurrencyChange = {e => setFromCur(e.target.value)}
        amount = {fromAmount}
        onAmountChange = {changeFromAmount}
       />
       <div><button onClick={buttonclick}>click</button></div>
       <div><h3>{toAmount}</h3></div>
       
       
    </>
  );
}

export default App;
