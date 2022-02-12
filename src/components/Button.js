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
