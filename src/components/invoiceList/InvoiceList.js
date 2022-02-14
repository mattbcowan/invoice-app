import { db, auth } from "../../firebase";
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import Filter from "./Filter";
import InvoiceListCard from "./InvoiceListCard";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button } from "../Button";
import { IconContext } from "react-icons";
import { Box, Grid } from "../Box";
import { Typography } from "../Typography";
import theme from "../../theme/theme";

const InvoiceList = ({ modal }) => {
  const [invoices, setInvoices] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    setLoading(true);
    const userRef = ref(db, `users/${auth.currentUser.uid}/invoices`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setInvoices(Object.entries(data));
      }
      setLoading(false);
    });
  }, []);

  const countInvoices = (invoices) => {
    if (invoices === null) {
      return "No invoices";
    }
    const invoiceQty = Object.keys(invoices).length;
    if (invoiceQty === 1) {
      return "1 Invoice";
    } else {
      return `${invoiceQty} Invoices`;
    }
  };

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
            {countInvoices(invoices)}
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
      {loading && <p>Loading...</p>}
      {!invoices && <p>No Invoices!</p>}
      {invoices && (
        <Grid display="grid" gridTemplateColumns="1fr" gridGap={3}>
          {invoices
            .filter((invoice) => {
              let filters = filterStatus.map((value) => {
                return value.label;
              });
              return filters.includes(invoice[1].status);
            })
            .map((invoice) => (
              <InvoiceListCard key={invoice} invoice={invoice} />
            ))}
        </Grid>
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
