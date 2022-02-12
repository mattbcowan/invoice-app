import React from "react";
import styled from "styled-components";
import { GoPrimitiveDot } from "react-icons/go";
import { StatusTag } from "../StatusTag";

const Status = ({ invoice }) => {
  return (
    <StatusWrapper>
      <div>Status</div>
      <StatusTag variant={invoice.status.toLowerCase()}>
        <GoPrimitiveDot /> {invoice.status}
      </StatusTag>
    </StatusWrapper>
  );
};

const StatusWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export default Status;
