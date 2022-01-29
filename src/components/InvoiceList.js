import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

const convertDateToString = (date) => {
  let dateString = date.toUTCString().slice(4, 16);
  return dateString;
};

const getTotal = (prices) => {
  let allPrices = [];
  prices.map((lineItem) => allPrices.push(lineItem.price));
  let finalPrice = allPrices.reduce((a, b) => parseInt(a) + parseInt(b));
  return finalPrice.toFixed(2);
};

const InvoiceList = () => {
  const [invoices, setInvoices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    const userRef = ref(db, `users/${auth.currentUser.uid}/invoices`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setInvoices(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      {loading && <p>Loading...</p>}
      {invoices && (
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              <div>{invoice.id}</div>
              <div>Due {convertDateToString(new Date(invoice.due_date))}</div>
              <div>{invoice.billing_info.client}</div>
              <div>Total: ${getTotal(invoice.line_items)}</div>
              <div>{invoice.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvoiceList;
