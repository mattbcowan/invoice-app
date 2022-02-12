import styled from "styled-components";
import { layout, space } from "styled-system";
import theme from "../theme/theme";

const ShadowBox = styled.div(
  {
    boxSizing: "border-box",
    minWidth: 0,
    background: "#ffffff",
    boxShadow: "0px 10px 10px -10px rgba(72, 84, 159, 0.100397)",
    borderRadius: theme.radii[2],
  },
  space,
  layout
);

export default ShadowBox;
