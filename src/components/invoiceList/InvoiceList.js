import { db, auth } from "../../firebase";
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import Filter from "./Filter";
import InvoiceListCard from "./InvoiceListCard";
import styled from "styled-components";
import Button from "../Button";

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
      <div>
        <h2>Invoices</h2>
        <div>{countInvoices(invoices)}</div>
        <Filter filter={filterStatus} setFilter={setFilterStatus} />
        <Button onClick={() => modal.current.open()}>New</Button>
      </div>
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

export default InvoiceList;
