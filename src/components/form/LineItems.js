import React from "react";
import { useFieldArray } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { LineItemTotal } from "./LineItemTotal";
import { Button } from "../styled/Button";
import styled from "styled-components";
import TextField from "./TextField";
import { H3 } from "../Typography";

const LineItems = ({ control, register, setValue, ...props }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "line_items",
  });

  return (
    <Wrapper
      mobileGridCol={props.mobileGridCol}
      desktopGridCol={props.desktopGridCol}
    >
      <H3>Item List</H3>
      <div>
        <StyledList>
          {fields.map((item, index) => (
            <li key={item.id}>
              <StyledFieldset>
                <Grid>
                  <TextField
                    register={register}
                    label="Item Name"
                    path={`line_items.${index}.name`}
                    mobileGridCol="1/13"
                    desktopGridCol="1/6"
                  />
                  <TextField
                    register={register}
                    label="Qty."
                    path={`line_items.${index}.quantity`}
                    mobileGridCol="1/4"
                    desktopGridCol="6/8"
                  />
                  <TextField
                    register={register}
                    label="Price"
                    path={`line_items.${index}.price`}
                    mobileGridCol="4/9"
                    desktopGridCol="8/10"
                  />
                  <LineItemTotal
                    control={control}
                    index={index}
                    setValue={setValue}
                    mobileGridCol="9/12"
                    desktopGridCol="10/12"
                  />
                  <DeleteButton
                    onClick={() => remove(index)}
                    mobileGridCol="12/13"
                    desktopGridCol="12/13"
                  >
                    <FaTrash />
                  </DeleteButton>
                </Grid>
              </StyledFieldset>
            </li>
          ))}
        </StyledList>
        <Button width="100%" type="button" onClick={() => append()}>
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

const Grid = styled.div`
  max-width: 100%;
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(12, 1fr);
`;

const Wrapper = styled.div`
  margin-bottom: 5em;
  width: 100%;

  grid-column: ${(props) => props.mobileGridCol};

  @media (min-width: 480px) {
    grid-column: ${(props) => props.desktopGridCol};
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #888eb0;
  padding: 0;
  display: flex;
  margin-top: 1.75em;
  align-items: center;
  grid-column: ${(props) => props.mobileGridCol};

  @media (min-width: 480px) {
    grid-column: ${(props) => props.desktopGridCol};
  }
`;

export default LineItems;
