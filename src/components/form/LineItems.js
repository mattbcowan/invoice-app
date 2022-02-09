import React from "react";
import { useFieldArray } from "react-hook-form";
import { LineItemTotal } from "./LineItemTotal";
import FormInput from "./FormInput";
import { Button } from "../Button";
import styled from "styled-components";

const LineItems = ({ control, register, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "line_items",
  });

  return (
    <div>
      <h3>Item List</h3>
      <div>
        <StyledList>
          {fields.map((item, index) => (
            <li key={item.id}>
              <StyledFieldset>
                <FormInput
                  register={register}
                  label="Item Name"
                  path={`line_items.${index}.name`}
                  type="text"
                  placeholder="Service Name"
                />
                <Grid>
                  <FormInput
                    register={register}
                    label="Qty."
                    path={`line_items.${index}.quantity`}
                    type="text"
                    placeholder="Quantity"
                  />
                  <FormInput
                    register={register}
                    label="Price"
                    path={`line_items.${index}.price`}
                    type="text"
                    placeholder="Price"
                  />
                  <TotalWrapper>
                    <label>Total</label>
                    <LineItemTotal
                      control={control}
                      index={index}
                      setValue={setValue}
                    />
                  </TotalWrapper>
                  <Button onClick={() => remove(index)}>Delete</Button>
                </Grid>
              </StyledFieldset>
            </li>
          ))}
        </StyledList>
        <Button onClick={() => append()}>Add New Item</Button>
      </div>
    </div>
  );
};

const StyledList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const StyledFieldset = styled.fieldset`
  border: none;
`;

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  max-width: 100%;
  display: grid;
  gap: 1em;
  grid-template-columns: 20% 35% 35% 20%;
`;

export default LineItems;
