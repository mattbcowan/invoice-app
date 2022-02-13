import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { GoPrimitiveDot } from "react-icons/go";
import { auth, db } from "../../firebase";
import ShadowBox from "../ShadowBox";
import ButtonBar from "./ButtonBar";
import LineItemsBox from "./LineItemsBox";
import BackButton from "../BackButton";
import { Box, Grid } from "../Box";
import { StatusTag } from "../StatusTag";
import { Typography } from "../Typography";
import theme from "../../theme/theme";
import styled from "styled-components";

const LargeText = ({ children }) => {
  return (
    <Typography
      fontSize={"15px"}
      fontWeight={theme.fontWeights.bold}
      letterSpacing={theme.letterSpacing[1]}
      lineHeight={theme.lineHeights[0]}
      color={"black"}
    >
      {children}
    </Typography>
  );
};

const Header = ({ children, spacing }) => {
  return (
    <Typography
      fontSize={theme.fontSizes.body}
      fontWeight={theme.fontWeights.normal}
      letterSpacing={theme.letterSpacing[1]}
      lineHeight={theme.lineHeights[0]}
      color={"lightPurpleGray"}
      mb={spacing || 2}
    >
      {children}
    </Typography>
  );
};

const Address = ({ children, spacing }) => {
  return (
    <Typography
      fontSize={theme.fontSizes.body2}
      fontWeight={theme.fontWeights.normal}
      letterSpacing={theme.letterSpacing[0]}
      lineHeight={theme.lineHeights[3]}
      color={"lightPurpleGray"}
      my={spacing}
    >
      {children}
    </Typography>
  );
};

const Invoice = ({ modal }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  let { invoiceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const userRef = ref(
      db,
      `users/${auth.currentUser.uid}/invoices/${invoiceId}`
    );
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setInvoice(data);
      setLoading(false);
    });
  }, [invoiceId]);

  return (
    <Box>
      {loading && <p>Loading...</p>}
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
            <StatusTag variant={invoice.status.toLowerCase()}>
              <GoPrimitiveDot /> {invoice.status}
            </StatusTag>
          </ShadowBox>
          <ShadowBox p={4} m={4}>
            <Grid display="grid" gridTemplateColumns="1fr 1fr" gridGap="1em">
              <Box>
                <Typography
                  fontSize={theme.fontSizes.body}
                  fontWeight={theme.fontWeights.bold}
                  letterSpacing={theme.letterSpacing[1]}
                  lineHeight={theme.lineHeights[0]}
                  color={"black"}
                  mb={1}
                >
                  <Hash>#</Hash>
                  {invoiceId}
                </Typography>
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
          <ButtonBar
            modal={modal}
            invoiceId={invoiceId}
            invoice={invoice}
            setInvoice={setInvoice}
            navigate={navigate}
          />
        </div>
      )}
    </Box>
  );
};

const Hash = styled.span`
  color: #7e88c3;
`;

export default Invoice;
