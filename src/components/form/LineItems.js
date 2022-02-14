import React from "react";
import { useFieldArray } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { LineItemTotal } from "./LineItemTotal";
import { Button } from "../Button";
import styled from "styled-components";
import TextField from "./TextField";

const LineItems = ({ control, register, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "line_items",
  });

  return (
    <Wrapper>
      <h3>Item List</h3>
      <div>
        <StyledList>
          {fields.map((item, index) => (
            <li key={item.id}>
              <StyledFieldset>
                <TextField
                  register={register}
                  label="Item Name"
                  path={`line_items.${index}.name`}
                />
                <Grid>
                  <TextField
                    register={register}
                    label="Qty."
                    path={`line_items.${index}.quantity`}
                  />
                  <TextField
                    register={register}
                    label="Price"
                    path={`line_items.${index}.price`}
                  />
                  <TotalWrapper>
                    <LineItemTotal
                      control={control}
                      index={index}
                      setValue={setValue}
                    />
                  </TotalWrapper>
                  <DeleteButton onClick={() => remove(index)}>
                    <FaTrash />
                  </DeleteButton>
                </Grid>
              </StyledFieldset>
            </li>
          ))}
        </StyledList>
        <Button width={"100%"} variant="secondary" onClick={() => append()}>
          + Add New Item
        </Button>
      </div>
    </Wrapper>
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
  grid-template-columns: 20% 30% 25% 25%;
`;

const Wrapper = styled.div`
  margin-bottom: 5em;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #888eb0;
  padding: 0;
  display: flex;
  margin-top: 1.75em;
  align-items: center;
`;

export default LineItems;
