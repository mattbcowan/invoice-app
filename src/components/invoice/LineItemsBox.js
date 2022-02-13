import React from "react";
import styled from "styled-components";
import Currency from "../Currency";

const LineItemsBox = ({ invoice }) => {
  const calculateTotal = (line_items) => {
    let amounts = line_items.map((item) => item.total);
    let total = amounts.reduce((a, b) => a + b);
    return total;
  };

  return (
    <LineItemsContainer>
      <LineItemsWrapper>
        {invoice.line_items &&
          invoice.line_items.map((item) => {
            return (
              <LineItem key={item.name}>
                <div>
                  <LineItemLabel>{item.name}</LineItemLabel>
                  <QuantityLabel>
                    {item.quantity} x <Currency value={item.price} />
                  </QuantityLabel>
                </div>
                <LineItemLabel>
                  <Currency value={item.total} />
                </LineItemLabel>
              </LineItem>
            );
          })}
      </LineItemsWrapper>
      <GrandTotalContainer>
        <LineItemsWrapper>
          <LineItem>
            <GrandTotalLabel>Grand Total</GrandTotalLabel>
            <GrandTotalAmount>
              <Currency value={calculateTotal(invoice.line_items)} />
            </GrandTotalAmount>
          </LineItem>
        </LineItemsWrapper>
      </GrandTotalContainer>
    </LineItemsContainer>
  );
};

const LineItemsContainer = styled.div`
  background-color: #f9fafe;
  border-radius: 1em;
  overflow: hidden;
`;

const LineItemsWrapper = styled.div`
  padding: 2em;
`;

const LineItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  :not(:last-child) {
    margin-bottom: 1em;
  }
`;

const LineItemLabel = styled.div`
  color: #0c0e16;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.25px;
  margin-bottom: 0.5em;
`;

const GrandTotalContainer = styled.div`
  background-color: #373b53;
`;

const GrandTotalLabel = styled.span`
  font-size: 11px;
  line-height: 18px;
  letter-spacing: -0.23px;
  color: #ffffff;
`;

const GrandTotalAmount = styled.span`
  font-size: 20px;
  line-height: 32px;
  letter-spacing: -0.42px;
  font-weight: 700;
  color: #ffffff;
`;

const QuantityLabel = styled(LineItemLabel)`
  color: #7e88c3;
`;

export default LineItemsBox;
