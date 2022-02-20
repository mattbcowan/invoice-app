import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import useWindowSize from "./hooks/useWindowSize";
import { Button, DangerButton } from "./styled/Button";
import { Body1, H2 } from "./Typography";

const DeleteAlert = ({ modal }) => {
  let location = useLocation();
  const invoiceId = location.pathname.slice(10, 16);
  const [{ invoices }, dispatch] = useStateValue();
  const invoice = invoices.find((x) => x.id === invoiceId);
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch({
      type: "UPDATE_INVOICE",
      invoice: { ...invoice, status: "Delete" },
    });
    modal.current.close();
    navigate("/invoices");
  };

  const screenSize = useWindowSize();
  return (
    <Wrapper height={screenSize.height} width={screenSize.width}>
      <Container>
        <Header>Confirm Deletion</Header>
        <Body1>
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </Body1>
        <ButtonContainer>
          <Button onClick={() => modal.current.close()}>Cancel</Button>
          <DangerButton onClick={handleDelete}>Delete</DangerButton>
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 327px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1em;
  margin-top: 1em;
`;

const Header = styled(H2)`
  margin-bottom: 1em;
`;

export default DeleteAlert;
