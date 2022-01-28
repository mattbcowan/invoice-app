import React from "react";
import { getAuth, signOut } from "firebase/auth";

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

const handleSignOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Signed Out");
    })
    .catch((error) => {
      console.error(error);
    });
};

const InvoiceList = ({ data }) => {
  return (
    <div>
      <button onClick={() => handleSignOut()}>Sign Out</button>
      <ul>
        {data.map((invoice) => (
          <li key={invoice.id}>
            <div>{invoice.id}</div>
            <div>Due {convertDateToString(new Date(invoice.due_date))}</div>
            <div>{invoice.billing_info.client}</div>
            <div>${getTotal(invoice.line_items)}</div>
            <div>{invoice.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
