import React from "react";
import { useFieldArray } from "react-hook-form";
import { LineItemTotal } from "./LineItemTotal";

const LineItems = ({ control, register, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "line_items",
  });

  return (
    <div>
      <h3>Item List</h3>
      <div>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <fieldset>
                <label>Item Name</label>
                <input
                  {...register(`line_items.${index}.name`, { required: true })}
                  placeholder="Service Name"
                />
                <label>Qty.</label>
                <input
                  {...register(`line_items.${index}.quantity`, {
                    required: true,
                  })}
                  placeholder="Quantity"
                />
                <label>Price</label>
                <input
                  {...register(`line_items.${index}.price`, { required: true })}
                  placeholder="Price"
                />
                <label>Total: </label>
                <LineItemTotal
                  control={control}
                  index={index}
                  setValue={setValue}
                />
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </fieldset>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => append()}>
          Add New Item
        </button>
      </div>
    </div>
  );
};

export default LineItems;
