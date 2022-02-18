import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import InvoiceListCard from "./InvoiceListCard";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button } from "../Button";
import { IconContext } from "react-icons";
import { Box, Grid } from "../Box";
import { Body1, H1 } from "../Typography";
import theme from "../../theme/theme";
import { useStateValue } from "../../StateProvider";
import { IconButton } from "../styled/Button";

const InvoiceList = ({ modal }) => {
  const [{ invoices }, dispatch] = useStateValue();
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
    setInvoiceQty(getFilteredInvoices().length);
  });

  return (
    <Container>
      <ButtonsContainer>
        <div>
          <InvoiceHeader>Invoices</InvoiceHeader>
          <Body1>{countInvoices(invoices.length)}</Body1>
        </div>
        <Filter filter={filterStatus} setFilter={setFilterStatus} />
        <IconButton onClick={() => modal.current.open()}>
          <IconContext.Provider
            value={{
              color: "#ffffff",
              size: "32px",
              style: { marginRight: "0.4em" },
            }}
          >
            <AiFillPlusCircle />
          </IconContext.Provider>
          New
        </IconButton>
      </ButtonsContainer>
      {invoices.length > 0 ? (
        <Grid display="grid" gridTemplateColumns="1fr" gridGap={3}>
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

const Container = styled.div`
  max-width: 730px;
  margin: 2em;

  @media (min-width: 768px) {
    margin: 0 auto;
    margin-top: 2em;
  }
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
