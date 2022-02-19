import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { DangerButton, PrimaryButton, SecondaryButton } from "../styled/Button";

const ButtonBar = ({ modal, invoice, marginTop, padding }) => {
  const navigate = useNavigate();
  const [{}, dispatch] = useStateValue();
  const isDisabled = invoice.status === "Paid";

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
    <ButtonContainer marginTop={marginTop} padding={padding}>
      <SecondaryButton dark={false} onClick={() => modal.current.open()}>
        Edit
      </SecondaryButton>
      <DangerButton dark={false} onClick={handleDelete}>
        Delete
      </DangerButton>
      {invoice.status === "Draft" ? (
        <PrimaryButton onClick={handleSend}>Send Invoice</PrimaryButton>
      ) : (
        <PrimaryButton disabled={isDisabled} onClick={handlePaid}>
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
  padding: ${(props) => props.padding};
  margin-top: ${(props) => props.marginTop};
`;

export default ButtonBar;
