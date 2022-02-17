import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { DangerButton, PrimaryButton, SecondaryButton } from "../styled/Button";

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
      <SecondaryButton dark={false} onClick={() => modal.current.open()}>
        Edit
      </SecondaryButton>
      <DangerButton dark={false} onClick={handleDelete}>
        Delete
      </DangerButton>
      {invoice.status === "Draft" ? (
        <PrimaryButton onClick={handleSend}>Send Invoice</PrimaryButton>
      ) : (
        <PrimaryButton
          disabled={invoice.status === "Paid"}
          onClick={handlePaid}
          dark={false}
        >
          Mark As Paid
        </PrimaryButton>
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
