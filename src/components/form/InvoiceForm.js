import React, { useEffect, useState } from "react";
import { auth, db, saveInvoice } from "../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LineItems from "./LineItems";
import { invoiceSchema } from "../../schema";
import { useLocation } from "react-router-dom";
import { get, ref } from "firebase/database";
import FormInput from "./FormInput";
import inputList from "./inputList.json";
import styled from "styled-components";
import { Button } from "../Button";

const InvoiceForm = ({ modal }) => {
  let location = useLocation();
  const invoiceId = location.pathname.slice(10, 16);
  const [loading, setLoading] = useState(null);
  const isAddMode = !invoiceId;
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(invoiceSchema),
    defaultValues: { status: "Pending", line_items: [] },
  });

  useEffect(() => {
    setLoading(true);

    if (!isAddMode && invoiceId !== "") {
      const userRef = ref(
        db,
        `users/${auth.currentUser.uid}/invoices/${invoiceId}`
      );
      get(userRef)
        .then((snapshot) => {
          return snapshot.val();
        })
        .then((res) => {
          const fields = [
            "bill_from_info",
            "bill_to_info",
            "status",
            "line_items",
          ];
          fields.forEach((field) => setValue(field, res[field]));
        });
    }
    setLoading(false);
  }, [isAddMode, invoiceId, setValue]);

  return (
    <Wrapper>
      {loading && <p>Loading...</p>}
      {
        <form
          onSubmit={handleSubmit((data) => {
            saveInvoice(data, isAddMode, invoiceId);
          })}
        >
          <FieldContainer>
            {isAddMode ? <h1>New Invoice</h1> : <h1>Edit #{invoiceId}</h1>}
            <StyledFieldset>
              <StyledLegend>Bill From</StyledLegend>
              {inputList.bill_from.map((listItem) => {
                return (
                  <FormInput
                    key={listItem.label}
                    register={register}
                    label={listItem.label}
                    path={listItem.path}
                    type={listItem.type}
                    options={listItem.options && listItem.options}
                    defaultValue={
                      listItem.defaultValue && listItem.defaultValue
                    }
                  />
                );
              })}
            </StyledFieldset>
            <StyledFieldset>
              <StyledLegend>Bill To</StyledLegend>
              {inputList.bill_to.map((listItem) => {
                return (
                  <FormInput
                    key={listItem.label}
                    register={register}
                    label={listItem.label}
                    path={listItem.path}
                    type={listItem.type}
                    options={listItem.options && listItem.options}
                    defaultValue={
                      listItem.defaultValue && listItem.defaultValue
                    }
                  />
                );
              })}
            </StyledFieldset>
            <LineItems
              {...{ control, watch, register, getValues, setValue, errors }}
            />
          </FieldContainer>
          <ButtonsContainer>
            {isAddMode ? (
              <ButtonGroup>
                <Button
                  backgroundColor="#F9FAFE"
                  color="#7E88C3"
                  onClick={() => modal.current.close()}
                >
                  Discard
                </Button>
                <Button
                  backgroundColor="#373B53"
                  color="#888EB0"
                  onClick={setValue("status", "Draft")}
                >
                  Save as Draft
                </Button>
                <Button onClick={setValue("status", "Pending")}>
                  Save & Send
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <Button onClick={() => modal.current.close()}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </ButtonGroup>
            )}
          </ButtonsContainer>
        </form>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  background: linear-gradient(to top, rgba(0, 0, 0, 10%) 5%, transparent 15%);
`;

const FieldContainer = styled.div`
  margin: 1em;
`;

const StyledLegend = styled.legend`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.25px;
  color: #7c5dfa;
`;

const StyledFieldset = styled.fieldset`
  border: none;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  margin: 2em;
  padding-top: 2em;
`;

export default InvoiceForm;
