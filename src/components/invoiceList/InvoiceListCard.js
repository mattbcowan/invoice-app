import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GoPrimitiveDot } from "react-icons/go";
import ShadowBox from "../ShadowBox";
import { StatusTag } from "../StatusTag";
import { Flexbox, Grid } from "../Box";
import Currency from "../Currency";
import { Typography } from "../Typography";
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
        <Grid
          display="grid"
          gridTemplateColumns="2fr 1fr"
          gridTemplateRows="1fr 2fr"
        >
          <Typography
            fontSize={theme.fontSizes.body}
            fontWeight={theme.fontWeights.bold}
            letterSpacing={theme.letterSpacing[1]}
            lineHeight={theme.lineHeights[0]}
            color={theme.colors.black}
          >
            <Hash>#</Hash>
            {invoice.id}
          </Typography>
          <Typography
            fontSize={theme.fontSizes.body}
            fontWeight={theme.fontWeights.normal}
            letterSpacing={theme.letterSpacing[1]}
            lineHeight={theme.lineHeights[0]}
            color={"#858bb2"}
            textAlign={"right"}
          >
            {invoice.bill_to_info.client_name}
          </Typography>
          <div>
            <Typography
              fontSize={theme.fontSizes.body}
              fontWeight={theme.fontWeights.normal}
              letterSpacing={theme.letterSpacing[1]}
              lineHeight={theme.lineHeights[0]}
              color={theme.colors.lightPurpleGray}
              my={3}
            >
              Due:{" "}
              {convertDateToString(new Date(invoice.bill_to_info.invoice_date))}
            </Typography>
            <Typography
              fontSize={theme.fontSizes.h2}
              fontWeight={theme.fontWeights.bold}
              letterSpacing={theme.letterSpacing[3]}
              lineHeight={theme.lineHeights[0]}
              color={theme.colors.black}
            >
              <Currency value={getTotal(invoice.line_items)} />
            </Typography>
          </div>
          <Flexbox display="flex" alignItems="center" justifyContent="flex-end">
            <StatusTag variant={invoice.status.toLowerCase()}>
              <GoPrimitiveDot /> {invoice.status}
            </StatusTag>
          </Flexbox>
        </Grid>
      </ShadowBox>
    </ActionBox>
  );
};

const ActionBox = styled(Link)`
  text-decoration: none;
  transition: 250ms ease;
  border-radius: ${theme.radii[2]};

  &:hover {
    transition: 250ms ease;
    outline: 2px solid ${theme.colors.darkPurple};
  }
`;

const Hash = styled.span`
  color: #7e88c3;
`;

export default InvoiceListCard;
