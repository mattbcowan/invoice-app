import React from "react";
import styled from "styled-components";

const InvoiceFields = ({ invoice, invoiceId }) => {
  return (
    <Grid>
      <FullCol>
        <InvoiceField>
          <Hash>#</Hash>
          <InvoiceNumber>{invoiceId}</InvoiceNumber>
          <div>{invoice.bill_to_info.project_description}</div>
        </InvoiceField>
        <StyledList>
          <li>{invoice.bill_from_info.street_name}</li>
          <li>{invoice.bill_from_info.city}</li>
          <li>{invoice.bill_from_info.state}</li>
          <li>{invoice.bill_from_info.zip_code}</li>
          <li>{invoice.bill_from_info.country}</li>
        </StyledList>
      </FullCol>
      <LeftCol>
        <InvoiceField>
          <div>Invoice Date</div>
          <ImportantText>{invoice.bill_to_info.invoice_date}</ImportantText>
        </InvoiceField>
        <InvoiceField>
          <div>Payment Due</div>
          <ImportantText>{invoice.bill_to_info.invoice_date}</ImportantText>
        </InvoiceField>
        <InvoiceField>
          <div>Sent to</div>
          <ImportantText>{invoice.bill_to_info.client_email}</ImportantText>
        </InvoiceField>
      </LeftCol>
      <RightCol>
        <InvoiceField>
          <div>Bill To</div>
          <ImportantText>{invoice.bill_to_info.client_name}</ImportantText>
          <StyledList>
            <li>{invoice.bill_to_info.street_name}</li>
            <li>{invoice.bill_to_info.city}</li>
            <li>{invoice.bill_to_info.state}</li>
            <li>{invoice.bill_to_info.zip_code}</li>
            <li>{invoice.bill_to_info.country}</li>
          </StyledList>
        </InvoiceField>
      </RightCol>
    </Grid>
  );
};

const InvoiceNumber = styled.span`
  text-decoration: none;
  font-weight: 700;
  color: #0c0e16;
`;

const Hash = styled.span`
  color: #7e88c3;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  line-height: 18px;
  font-size: 11px;
`;

const ImportantText = styled.div`
  font-size: 15px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: -0.31px;
  color: #0c0e16;
  margin-top: 0.5em;
`;

const InvoiceField = styled.div`
  margin: 3em 0;
`;

const LeftCol = styled.div`
  grid-column: 1/2;
`;

const RightCol = styled.div`
  grid-column: 2/3;
`;

const FullCol = styled.div`
  grid-column: 1/3;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
`;

export default InvoiceFields;
