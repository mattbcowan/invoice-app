import React from "react";
import { useWatch } from "react-hook-form";

const totalCal = (results) => {
  let totalValue = 0;

  totalValue = results.reduce((a, b) => a * b);

  return totalValue;
};

export const LineItemTotal = ({ control, index }) => {
  const results = useWatch({
    control,
    name: [`line_items.${index}.quantity`, `line_items.${index}.price`],
  });
  const output = totalCal(results);

  return output;
};
