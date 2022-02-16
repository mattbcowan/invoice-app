import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LineItems from "./LineItems";
import { invoiceSchema } from "../../schema";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../Button";
import TextField from "./TextField";
import Dropdown from "./Dropdown";
import theme from "../../theme/theme";
import { Typography } from "../Typography";
import { useStateValue } from "../../StateProvider";
import { createInvoiceNumber } from "../../formatting";

const Header = ({ children }) => {
  return (
    <Typography
      fontSize={24}
      fontWeight={theme.fontWeights.bold}
      letterSpacing={theme.letterSpacing[2]}
      lineHeight={theme.lineHeights[0]}
      color={theme.colors.black}
      m={3}
    >
      {children}
    </Typography>
  );
};

const InvoiceForm = ({ modal }) => {
  let location = useLocation();
  const invoiceId = location.pathname.slice(10, 16);
  const [{ user, invoices }, dispatch] = useStateValue();
  const invoice = invoices.find((x) => x.id === invoiceId);
  const [loading, setLoading] = useState(null);
  const invoiceDate = new Date(Date.now());
  const navigate = useNavigate();
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
    } else {
      dispatch({
        type: "UPDATE_INVOICE",
        invoice: { ...data, id: invoiceId },
      });
    }
  };

  return (
    <Wrapper>
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
                width={"100%"}
                register={register}
                path={"bill_from_info.street_name"}
                label={"Street Address"}
              />
              <TextField
                width={"50%"}
                register={register}
                path={"bill_from_info.city"}
                label={"City"}
              />
              <TextField
                width={"15%"}
                register={register}
                path={"bill_from_info.state"}
                label={"State"}
              />
              <TextField
                width={"25%"}
                register={register}
                path={"bill_from_info.zip_code"}
                label={"Zip Code"}
              />
              <TextField
                width={"100%"}
                register={register}
                path={"bill_from_info.country"}
                label={"Country"}
              />
            </StyledFieldset>
            <StyledFieldset>
              <StyledLegend>Bill To</StyledLegend>
              <TextField
                width={"100%"}
                register={register}
                path={"bill_to_info.client_name"}
                label={"Client's Name"}
              />
              <TextField
                width={"100%"}
                register={register}
                path={"bill_to_info.client_email"}
                label={"Client's Email"}
              />
              <TextField
                width={"100%"}
                register={register}
                path={"bill_to_info.street_name"}
                label={"Street Address"}
              />
              <TextField
                width={"50%"}
                register={register}
                path={"bill_to_info.city"}
                label={"City"}
              />
              <TextField
                width={"15%"}
                register={register}
                path={"bill_to_info.state"}
                label={"State"}
              />
              <TextField
                width={"25%"}
                register={register}
                path={"bill_to_info.zip_code"}
                label={"Zip Code"}
              />
              <TextField
                width={"100%"}
                register={register}
                path={"bill_to_info.country"}
                label={"Country"}
              />
              <TextField
                width={"100%"}
                register={register}
                path={"bill_to_info.invoice_date"}
                label={"Invoice Date"}
                disabled={true}
              />
              <Dropdown
                width={"100%"}
                register={register}
                label={"Payment Terms"}
                path={"bill_to_info.payment_terms"}
                defaultValue="Net 30 Days"
                setValue={setValue}
                options={[
                  "Net 1 Day",
                  "Net 7 Days",
                  "Net 14 Days",
                  "Net 30 Days",
                ]}
              />
              <TextField
                width={"100%"}
                register={register}
                path={"bill_to_info.project_description"}
                label={"Project Description"}
              />
              <LineItems
                {...{ control, watch, register, getValues, setValue, errors }}
              />
            </StyledFieldset>
          </FieldContainer>
          {isAddMode ? (
            <ButtonsContainer>
              <Button
                type="button"
                variant="secondary"
                onClick={() => modal.current.close()}
              >
                Discard
              </Button>
              <Button type="button" variant="tertiary">
                Save as Draft
              </Button>
              <Button type="submit" variant="primary">
                Save & Send
              </Button>
            </ButtonsContainer>
          ) : (
            <ButtonsContainer>
              <Button
                type="button"
                variant="secondary"
                onClick={() => modal.current.close()}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </ButtonsContainer>
          )}
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
  display: flex;
  flex-wrap: wrap;
  gap: 5%;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 1.5em;
  display: flex;
  justify-content: flex-end;
  gap: 1em;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1em;
  justify-content: flex-end;
  align-items: center;
  background-color: #ffffff;
  margin: 2em;
  padding-top: 2em;
`;

export default InvoiceForm;
