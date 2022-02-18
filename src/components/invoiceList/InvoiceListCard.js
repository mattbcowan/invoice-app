import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GoPrimitiveDot } from "react-icons/go";
import ShadowBox from "../ShadowBox";
import { StatusTag } from "../StatusTag";
import Currency from "../Currency";
import { Body1, H3 } from "../Typography";
import theme from "../../theme/theme";

const convertDateToString = (date) => {
  let dateString = date.toUTCString().slice(4, 16);
  return dateString;
};

const getTotal = (prices) => {
  let allPrices = [];
  prices.map((lineItem) => allPrices.push(lineItem.price * lineItem.quantity));
  let finalPrice = allPrices.reduce((a, b) => parseInt(a) + parseInt(b));
  return finalPrice;
};

const InvoiceListCard = ({ invoice }) => {
  return (
    <ActionBox to={invoice.id}>
      <ShadowBox p={4}>
        <Container>
          <InvoiceNumber>
            <Hash>#</Hash>
            {invoice.id}
          </InvoiceNumber>
          <DueDate>
            Due{" "}
            {convertDateToString(new Date(invoice.bill_to_info.invoice_date))}
          </DueDate>
          <ClientName>{invoice.bill_to_info.client_name}</ClientName>
          <Total>
            <Currency value={getTotal(invoice.line_items)} />
          </Total>
          <TagContainer>
            <StatusTag tagStatus={invoice.status.toLowerCase()}>
              <GoPrimitiveDot /> {invoice.status}
            </StatusTag>
          </TagContainer>
        </Container>
      </ShadowBox>
    </ActionBox>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  justify-content: space-between;
  align-items: center;
  gap: 0.5em;

  @media (min-width: 480px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 1em;
  }
`;

const InvoiceNumber = styled(Body1)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black};
  order: 1;
  grid-column: 1/2;
  grid-row: 1/2;

  @media (min-width: 480px) {
    grid-column: 1/2;
    grid-row: 1/2;
  }
`;

const DueDate = styled(Body1)`
  order: 3;
  grid-column: 1/2;
  grid-row: 3/4;

  @media (min-width: 480px) {
    order: 2;
    grid-column: 2/3;
    grid-row: 1/2;
  }
`;

const ClientName = styled(Body1)`
  order: 2;
  justify-self: end;

  @media (min-width: 480px) {
    justify-self: stretch;
    order: 3;
    grid-column: 3/4;
    grid-row: 1/2;
  }
`;

const TagContainer = styled.div`
  order: 4;
  grid-column: 2/3;
  grid-row: 3/5;
  justify-self: end;

  @media (min-width: 480px) {
    justify-self: stretch;
    order: 5;
    grid-column: 5/6;
    grid-row: 1/2;
  }
`;

const Total = styled(H3)`
  order: 5;
  grid-column: 1/2;
  grid-row: 4/5;

  @media (min-width: 480px) {
    order: 4;
    grid-column: 4/5;
    grid-row: 1/2;
  }
`;

const ActionBox = styled(Link)`
  text-decoration: none;
  transition: 250ms ease;
  border-radius: ${theme.radii[2]};
  max-width: 730px;

  &:hover {
    transition: 250ms ease;
    outline: 2px solid ${theme.colors.darkPurple};
  }
`;

const Hash = styled.span`
  color: #7e88c3;
`;

export default InvoiceListCard;
