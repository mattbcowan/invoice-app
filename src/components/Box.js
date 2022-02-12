import styled from "styled-components";
import { color, flexbox, grid, space, layout } from "styled-system";

const Box = styled.div(
  {
    boxSizing: "border-box",
    minWidth: 0,
  },
  layout,
  space,
  color
);

const Grid = styled(Box)(grid);

const Flexbox = styled(Box)(flexbox);

export { Box, Grid, Flexbox };
