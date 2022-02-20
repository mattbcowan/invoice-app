import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LineItems from "./LineItems";
import { invoiceSchema } from "../../schema";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TextField from "./TextField";
import Dropdown from "./Dropdown";
import { useStateValue } from "../../StateProvider";
import { Button, PrimaryButton, SecondaryButton } from "../styled/Button";
import BackButton from "../BackButton";

const InvoiceForm = ({ modal }) => {
  let location = useLocation();
  const invoiceId = location.pathname.slice(10, 16);
  const [{ invoices }, dispatch] = useStateValue();
  const invoice = invoices.find((x) => x.id === invoiceId);
  const [loading, setLoading] = useState(null);
  const invoiceDate = new Date(Date.now());
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
    defaultValues: {
      status: "Pending",
      line_items: [],
      bill_to_info: {
        invoice_date: invoiceDate.toDateString().slice(4),
        payment_terms: "Net 30 Days",
      },
    },
  });

  useEffect(() => {
    setLoading(true);

    if (!isAddMode && invoiceId !== "") {
      const fields = ["bill_from_info", "bill_to_info", "status", "line_items"];
      fields.forEach((field) => setValue(field, invoice[field]));
    }
    setLoading(false);
  }, [isAddMode, invoiceId, setValue]);

  const onSubmit = (data) => {
    if (isAddMode) {
      dispatch({
        type: "ADD_INVOICE",
        invoice: data,
      });
      modal.current.close();
    } else {
      dispatch({
        type: "UPDATE_INVOICE",
        invoice: { ...data, id: invoiceId },
      });
      modal.current.close();
    }
  };

  return (
    <Wrapper>
      <BackButton goBack={() => modal.current.close()} />
      {loading && <p>Loading...</p>}
      {
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldContainer>
            {isAddMode ? (
              <Header>New Invoice</Header>
            ) : (
              <Header>Edit #{invoiceId}</Header>
            )}
            <StyledFieldset>
              <StyledLegend>Bill From</StyledLegend>
              <TextField
                register={register}
                path={"bill_from_info.street_name"}
                label={"Street Address"}
                mobileGridCol={"1/3"}
                desktopGridCol={"1/7"}
              />
              <TextField
                register={register}
                path={"bill_from_info.city"}
                label={"City"}
                mobileGridCol={"1/3"}
                desktopGridCol={"1/3"}
              />
              <TextField
                register={register}
                path={"bill_from_info.state"}
                label={"State"}
                mobileGridCol={"1/2"}
                desktopGridCol={"3/5"}
              />
              <TextField
                register={register}
                path={"bill_from_info.zip_code"}
                label={"Zip Code"}
                mobileGridCol={"2/3"}
                desktopGridCol={"5/7"}
              />
              <TextField
                register={register}
                path={"bill_from_info.country"}
                label={"Country"}
                mobileGridCol={"1/3"}
                desktopGridCol={"1/7"}
              />
            </StyledFieldset>
            <StyledFieldset>
              <StyledLegend>Bill To</StyledLegend>
              <TextField
                register={register}
                path={"bill_to_info.client_name"}
                label={"Client's Name"}
                mobileGridCol={"1/3"}
                desktopGridCol={"1/7"}
              />
              <TextField
                register={register}
                path={"bill_to_info.client_email"}
                label={"Client's Email"}
                mobileGridCol={"1/3"}
                desktopGridCol={"1/7"}
              />
              <TextField
                register={register}
                path={"bill_to_info.street_name"}
                label={"Street Address"}
                mobileGridCol={"1/3"}
                desktopGridCol={"1/7"}
              />
              <TextField
                register={register}
                path={"bill_to_info.city"}
                label={"City"}
                mobileGridCol={"1/3"}
                desktopGridCol={"1/3"}
              />
              <TextField
                register={register}
                path={"bill_to_info.state"}
                label={"State"}
                mobileGridCol={"1/2"}
                desktopGridCol={"3/5"}
              />
              <TextField
                register={register}
                path={"bill_to_info.zip_code"}
                label={"Zip Code"}
                mobileGridCol={"2/3"}
                desktopGridCol={"5/7"}
              />
              <TextField
                register={register}
                path={"bill_to_info.country"}
                label={"Country"}
                mobileGridCol={"1/3"}
                desktopGridCol={"1/7"}
              />
              <TextField
                register={register}
                path={"bill_to_info.invoice_date"}
                label={"Invoice Date"}
                disabled={true}
                mobileGridCol={"1/3"}
                desktopGridCol={"1/4"}
              />
              <Dropdown
                register={register}
                label={"Payment Terms"}
                path={"bill_to_info.payment_terms"}
                defaultValue="Net 30 Days"
                setValue={setValue}
                mobileGridCol={"1/3"}
                desktopGridCol={"4/7"}
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
                mobileGridCol={"1/3"}
                desktopGridCol={"1/7"}
              />
              <LineItems
                {...{ control, watch, register, getValues, setValue, errors }}
                mobileGridCol={"1/3"}
                desktopGridCol={"1/7"}
              />
            </StyledFieldset>
          </FieldContainer>
          {isAddMode ? (
            <ButtonsContainer>
              <Button type="button" onClick={() => modal.current.close()}>
                Discard
              </Button>
              <SecondaryButton
                type="submit"
                onClick={() => setValue("status", "Draft")}
              >
                Save as Draft
              </SecondaryButton>
              <PrimaryButton type="submit">Save & Send</PrimaryButton>
            </ButtonsContainer>
          ) : (
            <ButtonsContainer>
              <Button type="button" onClick={() => modal.current.close()}>
                Cancel
              </Button>
              <PrimaryButton type="submit">Save Changes</PrimaryButton>
            </ButtonsContainer>
          )}
        </form>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  padding-top: 2em;
  background: linear-gradient(to top, rgba(0, 0, 0, 10%) 5%, transparent 15%);
  background-color: #ffffff;
  @media (min-width: 620px) {
    max-width: 620px;
  }
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 32px;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.black};
`;

const FieldContainer = styled.div`
  margin: 2em;
`;

const StyledLegend = styled.legend`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.25px;
  color: #7c5dfa;
  grid-column: 1/3;
  margin-top: 2em;
  margin-bottom: 1em;
`;

const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0;
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 480px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 1.5em;
  display: flex;
  justify-content: flex-end;
  gap: 1em;
`;

export default InvoiceForm;
