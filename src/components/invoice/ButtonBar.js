import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { saveInvoice } from "../../firebase";
import { Button } from "../Button";

const ButtonBar = ({ modal, invoiceId, invoice }) => {
  const navigate = useNavigate();
  const handlePaid = () => {
    saveInvoice({ ...invoice, status: "Paid" }, false, invoiceId);
  };

  const handleDelete = () => {
    saveInvoice({ ...invoice, status: "Delete" }, false, invoiceId);
  };

  return (
    <ButtonContainer>
      <Button variant="secondary" onClick={() => modal.current.open()}>
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          handleDelete();
          navigate("/invoices");
        }}
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
            navigate("/invoices");
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
