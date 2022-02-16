import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { Button } from "../Button";

const ButtonBar = ({ modal, invoice }) => {
  const navigate = useNavigate();
  const [{}, dispatch] = useStateValue();
  const handlePaid = () => {
    dispatch({
      type: "UPDATE_INVOICE",
      invoice: { ...invoice, status: "Paid" },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: "UPDATE_INVOICE",
      invoice: { ...invoice, status: "Delete" },
    });
    navigate("/invoices");
  };

  const handleSend = () => {
    dispatch({
      type: "UPDATE_INVOICE",
      invoice: { ...invoice, status: "Pending" },
    });
  };

  return (
    <ButtonContainer>
      <Button variant="secondary" onClick={() => modal.current.open()}>
        Edit
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
      {invoice.status === "Draft" ? (
        <Button variant="primary" onClick={handleSend}>
          Send Invoice
        </Button>
      ) : (
        <Button variant="primary" onClick={handlePaid}>
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
