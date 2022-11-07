import React from "react";

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    currencyTypes,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <div className="currencyRow">
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
  );
}
