import React from "react";

export default function CurrencyRow(props) {
  const {
    className,
    currencyOptions,
    currencyTypes,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <section className={`currencyRow ${className}`}>
      <div className="currencyContainer">
        <select
          className="currencyOptions"
          value={selectedCurrency}
          onChange={onChangeCurrency}
        >
          {currencyOptions.map((option) => (
            <option className="currency" key={option} value={option}>
              {currencyTypes[currencyOptions.indexOf(option)]}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="input"
          value={amount}
          onChange={onChangeAmount}
        />
      </div>
    </section>
  );
}
