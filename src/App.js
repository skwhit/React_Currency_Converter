import react, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

//AgspuRm9FLurPOykoj2tOum77tNFlCMe

const BASE_URL = 'https://api.exchangerate.host/latest';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  

  let toAmount, fromAmount;
  let initFetch;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)  
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOptions([...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setExchangeRate(data.rates[firstCurrency])
      console.log(exchangeRate)
      setToCurrency(firstCurrency)
      initFetch = true;
    })
    .catch(error => console.log(error))
  }, []);
  
  useEffect(() => {
    console.log("hey")
    console.log(fromCurrency, toCurrency)
    if(fromCurrency != undefined && toCurrency != undefined)
    {
      console.log("if works")
      fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setExchangeRate(data.result)
        console.log(exchangeRate)
      })
      
      // setExchangeRate(data.rates[toCurrency])
    }
    
  }, [fromCurrency, toCurrency])
  
  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
  <>
    <h1>Convert</h1>
    <CurrencyRow 
    currencyOptions={currencyOptions}
    selectedCurrency={fromCurrency}
    onChangeCurrency={e => setFromCurrency(e.target.value)}
    onChangeAmount={handleFromAmountChange}
    amount={fromAmount}
    />
    <div className="equals">=</div>
    <CurrencyRow 
    currencyOptions={currencyOptions}
    selectedCurrency={toCurrency}
    onChangeCurrency={e => setToCurrency(e.target.value)}
    onChangeAmount={handleToAmountChange}
    amount={toAmount}
    />
  </>
  );
}

export default App;
