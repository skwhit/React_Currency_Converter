import react, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
import { CurrencyCodes, CurrencyNames } from "./CurrencyData";
//AgspuRm9FLurPOykoj2tOum77tNFlCMe
console.clear();
const BASE_URL = "https://api.exchangerate.host/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currencyTypes, setCurrencyTypes] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  let initFetch;
  let currencyList = [];
  const filteredCodes = [];

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const firstCurrency = Object.keys(data.rates)[0];

        const currencyKeys = [...Object.keys(data.rates)];
        console.log(currencyKeys.length)
        let matchedCodeNumbers = CurrencyCodes.map((e) => {
          if (currencyKeys.includes(e)) {
            return CurrencyCodes.indexOf(e);
          } else {
            return "";
          }
        });
        matchedCodeNumbers = matchedCodeNumbers.filter((e) => e !== "");
        for (let number of matchedCodeNumbers) {
          currencyList.push(
            `${CurrencyCodes[number]} - ${CurrencyNames[number]}`
          );
          filteredCodes.push(CurrencyCodes[number])
        }
        console.log(matchedCodeNumbers);
        console.log(currencyList);
        console.log(filteredCodes);
        console.log(currencyOptions);

        setCurrencyOptions([...filteredCodes]);
        setCurrencyTypes([...currencyList])
        setFromCurrency(data.base);
        setExchangeRate(data.rates[firstCurrency]);
        console.log(exchangeRate);
        setToCurrency(firstCurrency);
        initFetch = true;
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(fromCurrency, toCurrency);
    if (fromCurrency != undefined && toCurrency != undefined) {
      fetch(
        `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setExchangeRate(data.result);
          console.log(exchangeRate);
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
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        currencyTypes={currencyTypes}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        currencyTypes={currencyTypes}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;
