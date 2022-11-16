import react, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
import { CurrencyCodes, CurrencyNames } from "./CurrencyData";
//AgspuRm9FLurPOykoj2tOum77tNFlCMe
// console.clear();
const BASE_URL = "https://api.exchangerate.host/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currencyTypes, setCurrencyTypes] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  let toAmount, fromAmount;
  let initFetch;
  let currencys = [];
  const filteredCodes = [];

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    async function fetchData() {
      const result = await fetch(BASE_URL);
      const data = await result.json();

      // console.log(data);
      const firstCurrency = Object.keys(data.rates)[0];

      const currencyKeys = [...Object.keys(data.rates)];
      // console.log(currencyKeys.length);
      let matchedCodeNumbers = CurrencyCodes.map((e) => {
        if (currencyKeys.includes(e)) {
          return CurrencyCodes.indexOf(e);
        }
        return null;
      });
      matchedCodeNumbers = matchedCodeNumbers.filter((e) => e !== null);
      if (initFetch != true) {
        for (let number of matchedCodeNumbers) {
          currencys.push(`${CurrencyCodes[number]} - ${CurrencyNames[number]}`);
          filteredCodes.push(CurrencyCodes[number]);
        }
        currencys.sort();
        filteredCodes.sort();
      }

      // console.log(matchedCodeNumbers);
      // console.log(currencys);
      // console.log(filteredCodes);

      setCurrencyOptions([...filteredCodes]);
      setCurrencyTypes([...currencys]);
      setFromCurrency(data.base);
      setExchangeRate(data.rates[firstCurrency]);
      setToCurrency(firstCurrency);
      setIsLoading(false);
      initFetch = true;
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    // console.log(fromCurrency, toCurrency);
    if (fromCurrency != undefined && toCurrency != undefined) {
      fetch(
        `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setExchangeRate(data.result);
          // console.log(exchangeRate);
          setIsLoading(false);
        });

      // setExchangeRate(data.rates[toCurrency])
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1>Convert Currency</h1>
        <div className="convertContainer">
          <CurrencyRow
            className={"firstRow"}
            currencyOptions={currencyOptions}
            currencyTypes={currencyTypes}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
          <div className="equals">
            {isLoading ? (<i class="fa-solid fa-spinner spin"></i>) 
            : (<i className="fa-solid fa-arrow-right-arrow-left"></i>)
            }
          </div>
          
          <CurrencyRow
            className={"secondRow"}
            currencyOptions={currencyOptions}
            currencyTypes={currencyTypes}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </div>
    </>
  );
}

export default App;
