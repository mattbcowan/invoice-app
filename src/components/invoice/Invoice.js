import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db, deleteInvoice, markAsPaid } from "../../firebase";
import { onValue, ref } from "firebase/database";

const Invoice = ({ modal }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  let { invoiceId } = useParams();
  const navigate = useNavigate();

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

  const calculateTotal = (line_items) => {
    let amounts = line_items.map((item) => item.total);
    let total = amounts.reduce((a, b) => a + b);
    return total;
  };

  const handlePaid = () => {
    setInvoice({ ...invoice, status: "Paid" });
    setInvoice((state) => {
      markAsPaid(state, invoiceId);
      return state;
    });
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {invoice && (
        <div>
          <button onClick={() => navigate(-1)}>Go back</button>
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
            <div>
              <div>Invoice Date</div>
              <div>{invoice.bill_to_info.invoice_date}</div>
            </div>
            <div>
              <div>Payment Due</div>
              <div>{invoice.bill_to_info.invoice_date}</div>
            </div>
            <div>
              <div>Sent to</div>
              <div>{invoice.bill_to_info.client_email}</div>
            </div>
            <div>
              <div>Bill To</div>
              <div>{invoice.bill_to_info.client_name}</div>
              <ul>
                <li>{invoice.bill_to_info.street_name}</li>
                <li>{invoice.bill_to_info.city}</li>
                <li>{invoice.bill_to_info.state}</li>
                <li>{invoice.bill_to_info.zip_code}</li>
                <li>{invoice.bill_to_info.country}</li>
              </ul>
            </div>
            <div>
              {invoice.line_items &&
                invoice.line_items.map((item) => {
                  return (
                    <div key={item.name}>
                      <div>{item.name}</div>
                      <div>
                        {item.quantity} x {item.price}
                      </div>
                      <div>{item.total}</div>
                    </div>
                  );
                })}
            </div>
            <div>
              <div>Grand Total</div>
              <div>{calculateTotal(invoice.line_items)}</div>
            </div>
          </div>
          <button onClick={() => modal.current.open()}>Edit</button>
          <button
            onClick={() =>
              deleteInvoice(invoiceId).then(() => navigate("/invoices"))
            }
          >
            Delete
          </button>
          {invoice.status === "Paid" ? (
            <button disabled>Mark As Paid</button>
          ) : (
            <button
              onClick={() => {
                handlePaid();
              }}
            >
              Mark As Paid
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Invoice;
