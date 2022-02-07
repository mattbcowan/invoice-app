import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../../firebase";
import Container from "../Container";
import Status from "./Status";
import ButtonBar from "./ButtonBar";
import LineItemsBox from "./LineItemsBox";
import InvoiceFields from "./InvoiceFields";
import BackButton from "./BackButton";

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

  return (
    <Wrapper>
      {loading && <p>Loading...</p>}
      {invoice && (
        <div>
          <BackButton navigate={navigate} />
          <Container>
            <Status invoice={invoice} />
          </Container>
          <Container>
            <InvoiceFields invoice={invoice} invoiceId={invoiceId} />
            <LineItemsBox invoice={invoice} />
          </Container>
          <ButtonBar
            modal={modal}
            invoiceId={invoiceId}
            invoice={invoice}
            setInvoice={setInvoice}
            navigate={navigate}
          />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: #7e88c3;
`;

export default Invoice;
