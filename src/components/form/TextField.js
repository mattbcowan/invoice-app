import React from "react";
import styled from "styled-components";
import { space, layout } from "styled-system";
import theme from "../../theme/theme";
import { Box } from "../Box";

const TextField = ({ register, label, path, width, disabled, value }) => {
  return (
    <Box width={width} my={2}>
      <span>{label}</span>
      <Input
        value={value}
        disabled={disabled}
        width={"100%"}
        p={12}
        my={2}
        type="text"
        {...register(path)}
      />
    </Box>
  );
};

const Input = styled("input")(
  {
    boxSizing: "border-box",
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    letterSpacing: theme.letterSpacing.body,
    lineHeight: theme.lineHeights[0],
    borderRadius: theme.radii[1],
    border: "1px solid #dfe3fa",
    outline: "none",
    ":focus": {
      borderColor: "#9277ff",
    },
  },
  space,
  layout
);

export default TextField;
