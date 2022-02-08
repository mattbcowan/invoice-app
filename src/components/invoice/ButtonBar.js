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
      <Button
        backgroundColor="#F9FAFE"
        color="#7E88C3"
        onClick={() => modal.current.open()}
      >
        Edit
      </Button>
      <Button
        backgroundColor="#EC5757"
        onClick={() =>
          deleteInvoice(invoiceId).then(() => navigate("/invoices"))
        }
      >
        Delete
      </Button>
      {invoice.status === "Paid" ? (
        <Button disabled>Mark As Paid</Button>
      ) : (
        <Button
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
  flex: 1;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
  padding: 2em;
  margin-top: 5em;
`;

export default ButtonBar;