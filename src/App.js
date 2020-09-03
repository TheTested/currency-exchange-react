import React, { useEffect, useState } from 'react';
import './App.css';
import Currency from './Currency';
import CurrencyAnswer from './CurrencyAnswer';
import Flag from 'react-world-flags'





function App() {


  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCur, setFromCur] = useState()
  const [toCur, setToCur] = useState()
  const [exRate, setExRate] = useState()
  const [fromAmount, setFromAmount] = useState()
  const [toAmount, setToAmount] = useState()
  const [showResults, setShowResults] = useState(false)
  const [fromAm, setFromAm] = useState()
  const [toCurr, setToCurr] = useState()
  const [fromCurr, setFromCurr] = useState()


  useEffect(() => {
    fetch('http://localhost:5000/getCurList')
      .then(res => res.json())
      .then(data => {
        let el = []
        data.forEach(element => {
          el.push([element.currency_name, element.currency_abbreviation])
        });
        setCurrencyOptions(el)
      })
  }, [])
 
  function clickedButton() {
    console.log('http://localhost:5000/getRate/'+fromAmount+'/'+fromCur+'/'+toCur)
    fetch('http://localhost:5000/getRate/'+fromAmount+'/'+fromCur+'/'+toCur)
      .then(res => res.json())
      .then(data => {
        setToAmount(data.amount_to)
        setExRate(data.exchange_rate)
        setFromAm(fromAmount)
        setFromCurr(fromCur)
        setToCurr(toCur)
      }).then(setShowResults(true))
  }


  return (
    <>
       <h1>Convert</h1>
       <Currency 
        currencyOptions = {currencyOptions}
        selectedCurrency = {fromCur}
        onCurrencyChange = {e => setFromCur(e.target.value)}
        onCurrencyChange2 = {e => setToCur(e.target.value)}
        onAmountChange = {e => setFromAmount(e.target.value)}
        amount = {fromAmount}
       />
       
       
       <button onClick={clickedButton}>click</button>
       { showResults ? <div class="answers"><div class="answerscont">
       <CurrencyAnswer 
          selectedCurrency = {fromCurr}
          amount = {fromAm}
       />
        <div className="equals">=</div>
        <CurrencyAnswer 
          selectedCurrency = {toCurr}
          amount = {toAmount}
        />
       </div>
       <h3>exchange rate: {exRate}</h3>
       </div>: null }
       
       
       
       
       
    </>
  );
}

export default App;
