import { useWatch } from "react-hook-form";

const totalCal = (results) => {
  let totalValue = 0;

  totalValue = results.reduce((a, b) => a * b);

  return totalValue;
};

export const LineItemTotal = ({ control, index, setValue }) => {
  const results = useWatch({
    control,
    name: [`line_items.${index}.quantity`, `line_items.${index}.price`],
  });
  const output = totalCal(results);
  setValue(`line_items.${index}.total`, output);

  return <div>{output ? output : 0}</div>;
};
