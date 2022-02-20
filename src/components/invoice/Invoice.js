import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import ShadowBox from "../ShadowBox";
import ButtonBar from "./ButtonBar";
import LineItemsBox from "./LineItemsBox";
import BackButton from "../BackButton";
import { StatusTag } from "../StatusTag";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { Body1, H3 } from "../Typography";
import Container from "../styled/Container";
import useWindowSize from "../hooks/useWindowSize";

const Invoice = ({ modal, deleteAlert }) => {
  let { invoiceId } = useParams();
  const [{ invoices }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const invoice = invoices.find((x) => x.id === invoiceId);
  const screenSize = useWindowSize();

  return (
    <div>
      {invoice && (
        <div>
          <Container>
            <BackButton goBack={() => navigate(-1)} />
            <ShadowBox marginBottom={"1em"} marginTop={"1em"}>
              <StatusContainer>
                <Body1>Status</Body1>
                <StatusTag tagStatus={invoice.status.toLowerCase()}>
                  <GoPrimitiveDot /> {invoice.status}
                </StatusTag>
                {screenSize.width > 480 && (
                  <ButtonBar
                    modal={modal}
                    deleteAlert={deleteAlert}
                    invoiceId={invoiceId}
                    invoice={invoice}
                  />
                )}
              </StatusContainer>
            </ShadowBox>
            <ShadowBox>
              <Grid>
                <InvoiceNumContainer>
                  <InvoiceNumber>
                    <Hash>#</Hash>
                    {invoiceId}
                  </InvoiceNumber>
                  <Body1>{invoice.bill_to_info.project_description}</Body1>
                </InvoiceNumContainer>
                <BillFromContainer>
                  <AddressLine>
                    {invoice.bill_from_info.street_name}
                  </AddressLine>
                  <AddressLine>
                    {invoice.bill_from_info.city} {invoice.bill_from_info.state}
                  </AddressLine>
                  <AddressLine>{invoice.bill_from_info.zip_code}</AddressLine>
                  <AddressLine>{invoice.bill_from_info.country}</AddressLine>
                </BillFromContainer>
                <InvoiceDateContainer>
                  <Label>Invoice Date</Label>
                  <H3>{invoice.bill_to_info.invoice_date}</H3>
                </InvoiceDateContainer>
                <PaymentDueContainer>
                  <Label>Payment Due</Label>
                  <H3>{invoice.bill_to_info.invoice_date}</H3>
                </PaymentDueContainer>
                <SentToContainer>
                  <Label>Sent To</Label>
                  <H3>{invoice.bill_to_info.client_email}</H3>
                </SentToContainer>
                <BillToContainer>
                  <Label>Bill To</Label>
                  <H3>{invoice.bill_to_info.client_name}</H3>
                  <AddressLine>{invoice.bill_to_info.street_name}</AddressLine>
                  <AddressLine>
                    {invoice.bill_to_info.city} {invoice.bill_to_info.state}
                  </AddressLine>
                  <AddressLine>{invoice.bill_to_info.zip_code}</AddressLine>
                  <AddressLine>{invoice.bill_to_info.country}</AddressLine>
                </BillToContainer>
              </Grid>
              <LineItemsBox invoice={invoice} />
            </ShadowBox>
          </Container>
          {screenSize.width < 480 && (
            <ButtonBar
              modal={modal}
              invoiceId={invoiceId}
              deleteAlert={deleteAlert}
              invoice={invoice}
              marginTop="5em"
              padding="2em"
            />
          )}
        </div>
      )}
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
  margin-bottom: 2em;

  @media (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const InvoiceNumContainer = styled.div`
  grid-column: 1/3;

  @media (min-width: 480px) {
    grid-column: 1/2;
  }
`;

const BillFromContainer = styled.div`
  grid-column: 1/3;

  @media (min-width: 480px) {
    grid-column: 3/5;
    text-align: right;
  }
`;

const InvoiceDateContainer = styled.div`
  grid-column: 1/2;

  @media (min-width: 480px) {
    grid-column: 1/2;
  }
`;

const PaymentDueContainer = styled.div`
  grid-column: 1/2;

  @media (min-width: 480px) {
    grid-column: 1/2;
  }
`;

const SentToContainer = styled.div`
  grid-column: 1/3;

  @media (min-width: 480px) {
    grid-column: 3/5;
    grid-row: 2/3;
  }
`;

const BillToContainer = styled.div`
  grid-column: 2/3;
  grid-row: 3/5;

  @media (min-width: 480px) {
    grid-column: 2/3;
    grid-row: 2/4;
  }
`;

const StatusContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;

  @media (min-width: 480px) {
    grid-template-columns: 10% 20% 70%;
    align-items: center;
  }
`;

const InvoiceNumber = styled(Body1)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 0.75em;
`;

const Hash = styled.span`
  color: #7e88c3;
`;

const AddressLine = styled(Body1)`
  margin-bottom: 0.5em;
`;

const Label = styled(Body1)`
  margin-bottom: 1em;
`;

export default Invoice;
