import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";
import theme from "../theme/theme";

export const Button = styled("button")(
  {
    appearance: "none",
    fontFamily: "inherit",
    fontSize: theme.fontSizes.body,
    letterSpacing: theme.letterSpacing.body,
    lineHeight: theme.lineHeights[0],
    border: "none",
    borderRadius: theme.radii[4],
    padding: theme.space[3],
    cursor: "pointer",
  },
  variant({
    variants: {
      primary: {
        color: "#ffffff",
        bg: theme.colors.darkPurple,
      },
      primaryIcon: {
        color: "#ffffff",
        bg: theme.colors.darkPurple,
        p: "6px",
        pr: 3,
      },
      secondary: {
        color: theme.colors.lightPurpleGray,
        bg: "#f9fafe",
      },
      tertiary: {
        color: theme.colors.gray,
        bg: "#373b53",
      },
      danger: {
        color: "#ffffff",
        bg: theme.colors.red,
      },
    },
  })
);

// export const Button = ({
//   onClick,
//   children,
//   backgroundColor,
//   color,
//   width,
// }) => {
//   return (
//     <Wrapper
//       backgroundColor={backgroundColor}
//       width={width}
//       color={color}
//       onClick={onClick}
//     >
//       {children}
//     </Wrapper>
//   );
// };

export const IconButton = ({
  onClick,
  children,
  backgroundColor,
  color,
  width,
}) => {
  return (
    <WrapperIcon
      backgroundColor={backgroundColor}
      color={color}
      width={width}
      onClick={onClick}
    >
      {children}
    </WrapperIcon>
  );
};

// const Wrapper = styled.button`
//   background-color: ${(props) => props.backgroundColor || "#7c5dfa"};
//   color: ${(props) => props.color || "#ffffff"};
//   font-size: 12px;
//   line-height: 15px;
//   padding: 1.5em 1.5em;
//   border-radius: 5em;
//   border: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   width: ${(props) => props.width || "auto"};
// `;

const WrapperIcon = styled.button`
  background-color: ${(props) => props.backgroundColor || "#7c5dfa"};
  color: ${(props) => props.color || "#ffffff"};
  font-size: 12px;
  line-height: 15px;
  padding: 0.25em;
  padding-right: 1em;
  border-radius: 5em;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
