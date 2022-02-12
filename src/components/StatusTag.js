import styled from "styled-components";
import { variant } from "styled-system";
import theme from "../theme/theme";

export const StatusTag = styled("div")(
  {
    appearance: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    display: "inline-block",
    textAlign: "center",
    maxWidth: "104px",
    maxHeight: "40px",
    lineHeight: theme.lineHeights[0],
    letterSpacing: theme.letterSpacing[1],
    fontSize: theme.fontSizes[1],
    fontWeight: theme.fontWeights[1],
    borderRadius: theme.radii[2],
    padding: theme.space[3],
  },
  variant({
    variants: {
      pending: {
        color: "#ff8f00",
        bg: "rgba(255, 143, 0, 0.06)",
      },
      paid: {
        color: "#33d69f",
        bg: "rgba(51, 214, 159, 0.06)",
      },
      draft: {
        color: "#373b53",
        bg: "rgba(55, 59, 83, 0.06)",
      },
    },
  })
);
