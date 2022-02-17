import styled from "styled-components";

export const StatusTag = styled.div`
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  min-width: 104px;
  max-height: 40px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii[2]};
  font-size: ${({ theme }) => theme.fontSizes.body1};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.body1};
  letter-spacing: ${({ theme }) => theme.letterSpacing[1]};
  background: ${({ theme, tagStatus }) => theme.status[tagStatus].background};
  color: ${({ theme, tagStatus }) => theme.status[tagStatus].color};
`;
