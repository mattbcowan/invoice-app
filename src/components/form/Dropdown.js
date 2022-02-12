import React, { useState } from "react";
import styled from "styled-components";
import { layout, shadow, space } from "styled-system";
import theme from "../../theme/theme";
import { Box, Flexbox } from "../Box";
import { Typography } from "../Typography";
import { BiChevronDown } from "react-icons/bi";

const Dropdown = ({ register, label, path, defaultValue, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(defaultValue);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const setSelection = (selection) => {
    setTitle(selection);
    setIsOpen(false);
  };

  return (
    <Box>
      <Typography
        fontSize={theme.fontSizes.body}
        fontWeight={theme.fontWeights.normal}
        letterSpacing={theme.letterSpacing[1]}
        lineHeight={theme.lineHeights[0]}
        color={"lightPurpleGray"}
      >
        {label}
      </Typography>
      <Box>
        <Title p={12} my={2} type="button" onClick={toggleList}>
          <div>
            <div>
              {title} <BiChevronDown />
            </div>
          </div>
        </Title>
        {isOpen && (
          <Wrapper mb={4}>
            <Flexbox display="flex" flexDirection="column">
              {options.map((option) => {
                return (
                  <Option
                    p={3}
                    type="button"
                    onClick={() => setSelection(option)}
                  >
                    {option}
                  </Option>
                );
              })}
            </Flexbox>
          </Wrapper>
        )}
      </Box>
    </Box>
  );
};

const Title = styled("button")(
  {
    boxSizing: "border-box",
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    letterSpacing: theme.letterSpacing.body,
    lineHeight: theme.lineHeights[0],
    borderRadius: theme.radii[1],
    border: "1px solid #dfe3fa",
    outline: "none",
    background: "transparent",
    ":focus": {
      borderColor: "#9277ff",
    },
  },
  space,
  layout
);

const Option = styled("button")(
  {
    boxSizing: "border-box",
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    letterSpacing: theme.letterSpacing.body,
    lineHeight: theme.lineHeights[0],
    border: "none",
    borderBottom: `1px solid ${theme.colors.lightGray}`,
    background: "transparent",
    cursor: "pointer",
    textAlign: "left",
    ":last-child": {
      borderBottom: "none",
    },
    ":hover": {
      color: theme.colors.darkPurple,
    },
  },
  space,
  layout
);

const Wrapper = styled("div")(
  {
    boxSizing: "border-box",
    background: "#ffffff",
    boxShadow: "0px 10px 20px rgba(72, 84, 159, 0.25)",
    borderRadius: theme.radii[2],
  },
  space,
  layout,
  shadow
);

export default Dropdown;
