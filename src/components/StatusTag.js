import React from "react";
import styled from "styled-components";

const StatusTag = ({ status }) => {
  if (status === "Pending") {
    return (
      <Pending>
        <StatusBullet>•</StatusBullet> {status}
      </Pending>
    );
  } else if (status === "Paid") {
    return (
      <Paid>
        <StatusBullet>•</StatusBullet> {status}
      </Paid>
    );
  } else if (status === "Draft") {
    return (
      <Draft>
        <StatusBullet>•</StatusBullet> {status}
      </Draft>
    );
  } else {
    <Container>
      <StatusBullet>•</StatusBullet> {status}
    </Container>;
  }
};

const StatusBullet = styled.span`
  color: inherit;
  font-size: 1.3rem;
  margin-right: 0.25rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  letter-spacing: -0.25px;
  font-weight: 700;
  padding: 1.25em;
  border-radius: 0.5em;
`;

const Pending = styled(Container)`
  color: #ff8f00;
  background: rgba(255, 143, 0, 0.06);
`;
const Paid = styled(Container)`
  color: #33d69f;
  background: rgba(51, 214, 159, 0.06);
`;
const Draft = styled(Container)`
  color: #373b53;
  background: rgba(55, 59, 83, 0.06);
`;

export default StatusTag;
