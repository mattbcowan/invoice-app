import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import ShadowBox from "../ShadowBox";
import ButtonBar from "./ButtonBar";
import LineItemsBox from "./LineItemsBox";
import BackButton from "../BackButton";
import { Box, Grid } from "../Box";
import { StatusTag } from "../StatusTag";
import theme from "../../theme/theme";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";

const LargeText = ({ children }) => {
  return <span>{children}</span>;
};

const Header = ({ children, spacing }) => {
  return <span>{children}</span>;
};

const Address = ({ children, spacing }) => {
  return <span>{children}</span>;
};

const Invoice = ({ modal }) => {
  let { invoiceId } = useParams();
  const [{ invoices }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const invoice = invoices.find((x) => x.id === invoiceId);

  return (
    <Box>
      {invoice && (
        <div>
          <BackButton navigate={navigate} />
          <ShadowBox
            px={4}
            py={4}
            m={4}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Header spacing="0">Status</Header>
            <StatusTag tagStatus={invoice.status.toLowerCase()}>
              <GoPrimitiveDot /> {invoice.status}
            </StatusTag>
          </ShadowBox>
          <ShadowBox p={4} m={4}>
            <Grid display="grid" gridTemplateColumns="1fr 1fr" gridGap="1em">
              <Box>
                <span
                  fontSize={theme.fontSizes.body}
                  fontWeight={theme.fontWeights.bold}
                  letterSpacing={theme.letterSpacing[1]}
                  lineHeight={theme.lineHeights[0]}
                  color={"black"}
                  mb={1}
                >
                  <Hash>#</Hash>
                  {invoiceId}
                </span>
                <Header>{invoice.bill_to_info.project_description}</Header>
                <Address spacing={4}>
                  {invoice.bill_from_info.street_name}
                  <br />
                  {invoice.bill_from_info.city} {invoice.bill_from_info.state}
                  <br />
                  {invoice.bill_from_info.zip_code}
                  <br />
                  {invoice.bill_from_info.country}
                </Address>
                <Box mb={5}>
                  <Header>Invoice Date</Header>
                  <LargeText>{invoice.bill_to_info.invoice_date}</LargeText>
                </Box>
                <Box mb={5}>
                  <Header>Payment Due</Header>
                  <LargeText>{invoice.bill_to_info.invoice_date}</LargeText>
                </Box>
                <Box mb={5}>
                  <Header>Sent To</Header>
                  <LargeText>{invoice.bill_to_info.client_email}</LargeText>
                </Box>
              </Box>
              <Box mt={"9em"}>
                <Header>Bill To</Header>
                <LargeText>{invoice.bill_to_info.client_name}</LargeText>
                <Address spacing={2}>
                  {invoice.bill_to_info.street_name}
                  <br />
                  {invoice.bill_to_info.city} {invoice.bill_to_info.state}
                  <br />
                  {invoice.bill_to_info.zip_code}
                  <br />
                  {invoice.bill_to_info.country}
                </Address>
              </Box>
            </Grid>
            <LineItemsBox invoice={invoice} />
          </ShadowBox>
          <ButtonBar modal={modal} invoiceId={invoiceId} invoice={invoice} />
        </div>
      )}
    </Box>
  );
};

const Hash = styled.span`
  color: #7e88c3;
`;

export default Invoice;
