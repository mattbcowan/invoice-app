import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import InvoiceListCard from "./InvoiceListCard";
import styled from "styled-components";
import { Body1 } from "../Typography";
import { useStateValue } from "../../StateProvider";
import { PrimaryButton } from "../styled/Button";
import Container from "../styled/Container";

const InvoiceList = ({ modal }) => {
  const [{ invoices }] = useStateValue();
  const [invoiceQty, setInvoiceQty] = useState(0);
  const [filterStatus, setFilterStatus] = useState([
    {
      value: "draft",
      label: "Draft",
    },
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "paid",
      label: "Paid",
    },
  ]);

  const getFilteredInvoices = () => {
    const filteredInvoices = invoices.filter((invoice) => {
      let filters = filterStatus.map((value) => {
        return value.label;
      });
      const status = invoice.status;
      return filters.includes(status);
    });
    return filteredInvoices;
  };

  const countInvoices = (invoiceQty) => {
    if (invoiceQty === 0) {
      return "No invoices";
    }
    if (invoiceQty === 1) {
      return "1 Invoice";
    } else {
      return `${invoiceQty} Invoices`;
    }
  };

  useEffect(() => {
    let invoices = getFilteredInvoices().length;
    setInvoiceQty(invoices);
  }, []);

  return (
    <Container>
      <ButtonsContainer>
        <div>
          <InvoiceHeader>Invoices</InvoiceHeader>
          <Body1>{countInvoices(invoiceQty)}</Body1>
        </div>
        <Filter filter={filterStatus} setFilter={setFilterStatus} />
        <PrimaryButton onClick={() => modal.current.open()}>New</PrimaryButton>
      </ButtonsContainer>
      {invoices.length > 0 ? (
        <Grid>
          {invoices
            .filter((invoice) => {
              let filters = filterStatus.map((value) => {
                return value.label;
              });
              const status = invoice.status;
              return filters.includes(status);
            })
            .map((invoice, i) => (
              <InvoiceListCard key={i} invoice={invoice} />
            ))}
        </Grid>
      ) : (
        <p>No Invoices!</p>
      )}
    </Container>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 1em;
  margin-bottom: 2em;
`;

const InvoiceHeader = styled.div`
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.63px;
  line-height: 1;
  margin-bottom: 0.25em;

  @media (min-width: 480px) {
    font-size: 32px;
    letter-spacing: -1px;
    line-height: 1;
  }
`;

export default InvoiceList;
