import React from "react";
import CurrencyFormat from "react-currency-format";

const Currency = ({ value }) => {
  return (
    <CurrencyFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
      decimalSeparator={"."}
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
};

export default Currency;
