import { db, auth } from "../../firebase";
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import Filter from "./Filter";
import InvoiceListCard from "./InvoiceListCard";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import Button from "../Button";
import { IconContext } from "react-icons";

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
    <div>
      <OptionsBar>
        <div>
          <Header>Invoices</Header>
          <div>{countInvoices(invoices)}</div>
        </div>
        <ButtonsContainer>
          <Filter filter={filterStatus} setFilter={setFilterStatus} />
          <Button onClick={() => modal.current.open()}>
            <IconContext.Provider
              value={{
                color: "#ffffff",
                size: "2.5em",
                style: { marginRight: "0.4em" },
              }}
            >
              <AiFillPlusCircle />
            </IconContext.Provider>
            New
          </Button>
        </ButtonsContainer>
      </OptionsBar>
      {loading && <p>Loading...</p>}
      {!invoices && <p>No Invoices!</p>}
      {invoices && (
        <StyledUl>
          {invoices
            .filter((invoice) => {
              let filters = filterStatus.map((value) => {
                return value.label;
              });
              return filters.includes(invoice[1].status);
            })
            .map((invoice) => (
              <li key={invoice[0]}>
                <InvoiceListCard invoice={invoice} />
              </li>
            ))}
        </StyledUl>
      )}
    </div>
  );
};

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const OptionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2em;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.h2`
  margin-bottom: 0.25em;
`;

export default InvoiceList;
