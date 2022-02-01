import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { onValue, ref } from "firebase/database";

const Invoice = ({ modal }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  let { invoiceId } = useParams();

  useEffect(() => {
    setLoading(true);
    const userRef = ref(
      db,
      `users/${auth.currentUser.uid}/invoices/${invoiceId}`
    );
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setInvoice(data);
      setLoading(false);
    });
  }, [invoiceId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {invoice && (
        <div>
          <div>{invoice.status}</div>
          <div>{invoiceId}</div>
          <div>{invoice.bill_to_info.project_description}</div>
          <ul>
            <li>{invoice.bill_from_info.street_name}</li>
            <li>{invoice.bill_from_info.city}</li>
            <li>{invoice.bill_from_info.state}</li>
            <li>{invoice.bill_from_info.zip_code}</li>
            <li>{invoice.bill_from_info.country}</li>
          </ul>
          <button onClick={() => modal.current.open()}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Invoice;
