import React from "react";
import styled from "styled-components";
import { deleteInvoice, markAsPaid } from "../../firebase";
import { Button } from "../Button";

const ButtonBar = ({ modal, invoiceId, setInvoice, invoice, navigate }) => {
  const handlePaid = () => {
    setInvoice({ ...invoice, status: "Paid" });
    setInvoice((state) => {
      markAsPaid(state, invoiceId);
      return state;
    });
  };

  return (
    <ButtonContainer>
      <Button variant="secondary" onClick={() => modal.current.open()}>
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          deleteInvoice(invoiceId).then(() => navigate("/invoices"))
        }
      >
        Delete
      </Button>
      {invoice.status === "Paid" ? (
        <Button variant="primary" disabled>
          Mark As Paid
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={() => {
            handlePaid();
          }}
        >
          Mark As Paid
        </Button>
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  gap: 1em;
  justify-content: flex-end;
  background-color: #ffffff;
  width: 100%;
  padding: 2em;
  margin-top: 5em;
`;

export default ButtonBar;
