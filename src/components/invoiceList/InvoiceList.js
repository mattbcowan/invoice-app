import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import InvoiceListCard from "./InvoiceListCard";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button } from "../Button";
import { IconContext } from "react-icons";
import { Box, Grid } from "../Box";
import { Typography } from "../Typography";
import theme from "../../theme/theme";
import { useStateValue } from "../../StateProvider";

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
    <Box m={4}>
      <Grid display="grid" gridTemplateColumns="1fr 1fr" gridGap={1} mb={4}>
        <div>
          <Header>Invoices</Header>
          <Typography
            color={theme.colors.gray}
            fontSize={theme.fontSizes.body}
            letterSpacing={theme.letterSpacing.body}
            lineHeight={theme.lineHeights[0]}
          >
            {countInvoices(invoiceQty)}
          </Typography>
        </div>
        <ButtonsContainer>
          <Filter filter={filterStatus} setFilter={setFilterStatus} />
          <Button variant="primaryIcon" onClick={() => modal.current.open()}>
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
          </Button>
        </ButtonsContainer>
      </Grid>
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
    </Box>
  );
};

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5em;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const Header = styled.h2`
  margin-bottom: 0.25em;
`;

export default InvoiceList;
