import { db, auth } from "../firebase";
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { Link } from "react-router-dom";
import Filter from "./Filter";

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
        <button onClick={() => modal.current.open()}>New Invoice</button>
      </div>
      {loading && <p>Loading...</p>}
      {!invoices && <p>No Invoices!</p>}
      {invoices && (
        <ul>
          {invoices
            .filter((invoice) => {
              let filters = filterStatus.map((value) => {
                return value.label;
              });
              return filters.includes(invoice[1].status);
            })
            .map((invoice) => (
              <li key={invoice[0]}>
                <div>
                  <Link to={invoice[0]}>{invoice[0]}</Link>
                </div>
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
