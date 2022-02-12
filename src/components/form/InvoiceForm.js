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
import TextField from "./TextField";
import Dropdown from "./Dropdown";

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
              <TextField
                register={register}
                path={"bill_from_info.street_name"}
                label={"Street Address"}
              />
              <TextField
                register={register}
                path={"bill_from_info.city"}
                label={"City"}
              />
              <TextField
                register={register}
                path={"bill_from_info.state"}
                label={"State"}
              />
              <TextField
                register={register}
                path={"bill_from_info.zip_code"}
                label={"Zip Code"}
              />
              <TextField
                register={register}
                path={"bill_from_info.country"}
                label={"Country"}
              />
            </StyledFieldset>
            <StyledFieldset>
              <StyledLegend>Bill To</StyledLegend>
              <TextField
                register={register}
                path={"bill_to_info.client_name"}
                label={"Client's Name"}
              />
              <TextField
                register={register}
                path={"bill_to_info.client_email"}
                label={"Client's Email"}
              />
              <TextField
                register={register}
                path={"bill_to_info.street_name"}
                label={"Street Address"}
              />
              <TextField
                register={register}
                path={"bill_to_info.city"}
                label={"City"}
              />
              <TextField
                register={register}
                path={"bill_to_info.state"}
                label={"State"}
              />
              <TextField
                register={register}
                path={"bill_to_info.zip_code"}
                label={"Zip Code"}
              />
              <TextField
                register={register}
                path={"bill_to_info.country"}
                label={"Country"}
              />
              <TextField
                register={register}
                path={"bill_to_info.invoice_date"}
                label={"Invoice Date"}
              />
              <Dropdown
                register={register}
                label={"Payment Terms"}
                path={"bill_to_info.payment_terms"}
                defaultValue="Net 30 Days"
                options={[
                  "Net 1 Day",
                  "Net 7 Days",
                  "Net 14 Days",
                  "Net 30 Days",
                ]}
              />
              <TextField
                register={register}
                path={"bill_to_info.project_description"}
                label={"Project Description"}
              />
            </StyledFieldset>
            <LineItems
              {...{ control, watch, register, getValues, setValue, errors }}
            />
          </FieldContainer>
          <ButtonsContainer>
            {isAddMode ? (
              <ButtonGroup>
                <Button variant="danger" onClick={() => modal.current.close()}>
                  Discard
                </Button>
                <Button
                  variant="tertiary"
                  onClick={setValue("status", "Draft")}
                >
                  Save as Draft
                </Button>
                <Button
                  variant="primary"
                  onClick={setValue("status", "Pending")}
                >
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

const InputLabel = styled.label`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.25px;
  color: #7e88c3;
  margin-bottom: 0.75em;
`;

const StyledInput = styled.input`
  font-size: 12px;
  line-height: 15px;
  font-weight: 700;
  letter-spacing: -0.25px;
  color: #0c0e16;
  padding: 1em;
  border: 1px solid #dfe3fa;
  border-radius: 0.5em;
`;

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
