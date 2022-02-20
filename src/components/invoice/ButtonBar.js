import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { DangerButton, PrimaryButton, SecondaryButton } from "../styled/Button";

const ButtonBar = ({ modal, deleteAlert, invoice, marginTop, padding }) => {
  const [{}, dispatch] = useStateValue();
  const [isDisabled, setIsDisabled] = useState(null);

  useEffect(() => {
    if (invoice.status === "Paid") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, []);

  const handlePaid = () => {
    dispatch({
      type: "UPDATE_INVOICE",
      invoice: { ...invoice, status: "Paid" },
    });
  };

  const handleSend = () => {
    dispatch({
      type: "UPDATE_INVOICE",
      invoice: { ...invoice, status: "Pending" },
    });
  };

  return (
    <ButtonContainer marginTop={marginTop} padding={padding}>
      <SecondaryButton
        disabled={isDisabled}
        dark={false}
        onClick={() => modal.current.open()}
      >
        Edit
      </SecondaryButton>
      <DangerButton dark={false} onClick={() => deleteAlert.current.open()}>
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
