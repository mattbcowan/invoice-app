import styled from "styled-components";
import { variant, layout, system } from "styled-system";
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
    transition: "250ms ease-out",
  },
  variant({
    variants: {
      primary: {
        color: "#ffffff",
        bg: theme.colors.darkPurple,
        "&:hover": {
          bg: theme.colors.purple,
          transition: "300ms ease-out",
        },
        "&:disabled": {
          bg: theme.colors.purple,
          transition: "none",
          cursor: "not-allowed",
        },
      },
      primaryIcon: {
        color: "#ffffff",
        bg: theme.colors.darkPurple,
        p: "6px",
        pr: 3,
        "&:hover": {
          bg: theme.colors.purple,
        },
      },
      secondary: {
        color: theme.colors.lightPurpleGray,
        bg: "#f9fafe",
        "&:hover": {
          bg: theme.colors.lightGray,
        },
      },
      tertiary: {
        color: theme.colors.gray,
        bg: "#373b53",
        "&:hover": {
          color: theme.colors.lightGray,
        },
      },
      danger: {
        color: "#ffffff",
        bg: theme.colors.red,
        "&:hover": {
          bg: theme.colors.lightRed,
        },
      },
    },
  }),
  layout
);
