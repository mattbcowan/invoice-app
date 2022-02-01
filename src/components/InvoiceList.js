import { db, auth } from "../firebase";
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";

const convertDateToString = (date) => {
  let dateString = date.toUTCString().slice(4, 16);
  return dateString;
};

const getTotal = (prices) => {
  let allPrices = [];
  prices.map((lineItem) => allPrices.push(lineItem.price * lineItem.quantity));
  let finalPrice = allPrices.reduce((a, b) => parseInt(a) + parseInt(b));
  return finalPrice;
};

const InvoiceList = () => {
  const [invoices, setInvoices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const userRef = ref(db, `users/${auth.currentUser.uid}/invoices`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setInvoices(Object.entries(data));
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
            <li key={invoice[0]}>
              <div>{invoice[0]}</div>
              <div>
                Due:{" "}
                {convertDateToString(
                  new Date(invoice[1].bill_to_info.invoice_date)
                )}
              </div>
              <div>{invoice[1].bill_to_info.client_name}</div>
              <div>Total: ${getTotal(invoice[1].line_items)}</div>
              <div>{invoice[1].status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvoiceList;
