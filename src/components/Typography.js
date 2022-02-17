import styled from "styled-components";

export const H1 = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.h1};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.h1};
  letter-spacing: ${({ theme }) => theme.letterSpacing[4]};
  color: ${({ theme }) => theme.colors.black};
`;
export const H2 = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.h2};
  letter-spacing: ${({ theme }) => theme.letterSpacing[2]};
  color: ${({ theme }) => theme.colors.black};
`;
export const H3 = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.h3};
  letter-spacing: ${({ theme }) => theme.letterSpacing[3]};
  color: ${({ theme }) => theme.colors.black};
`;
export const H4 = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.h4};
  letter-spacing: ${({ theme }) => theme.letterSpacing[1]};
  color: ${({ theme }) => theme.colors.black};
`;
export const Body1 = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body1};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body1};
  letter-spacing: ${({ theme }) => theme.letterSpacing[1]};
  color: ${({ theme }) => theme.colors.grayBlue};
`;

export const Body2 = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body2};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body2};
  letter-spacing: ${({ theme }) => theme.letterSpacing[0]};
  color: ${({ theme }) => theme.colors.black};
`;
