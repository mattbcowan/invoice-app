import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "../Container";
import StatusTag from "../StatusTag";

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
    <Container>
      <Wrapper>
        <div>
          <Hash>#</Hash>
          <InvoiceNumber to={invoice[0]}>{invoice[0]}</InvoiceNumber>
        </div>
        <ClientName>{invoice[1].bill_to_info.client_name}</ClientName>
        <div>
          <DueDate>
            Due:{" "}
            {convertDateToString(
              new Date(invoice[1].bill_to_info.invoice_date)
            )}
          </DueDate>
          <Total>${getTotal(invoice[1].line_items)}</Total>
        </div>
        <StatusWrapper>
          <StatusTag status={invoice[1].status} />
        </StatusWrapper>
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-self: center;
`;

const InvoiceNumber = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  color: #0c0e16;
`;

const Hash = styled.span`
  color: #7e88c3;
`;

const ClientName = styled.div`
  color: #858bb2;
  text-align: right;
  margin-bottom: 1.5em;
`;

const DueDate = styled.div`
  color: #7e88c3;
  line-height: 3;
`;

const Total = styled.div`
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.8px;
  line-height: 1;
  color: #0c0e16;
`;

const StatusWrapper = styled.div`
  align-self: flex-end;
`;

export default InvoiceListCard;
