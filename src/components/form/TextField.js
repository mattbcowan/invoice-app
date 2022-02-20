import React from "react";
import styled from "styled-components";
import { Body1 } from "../Typography";

const TextField = ({ register, label, path, disabled, value, ...props }) => {
  return (
    <TextFieldWrapper
      mobileGridCol={props.mobileGridCol}
      mobileGridRow={props.mobileGridRow}
      desktopGridCol={props.desktopGridCol}
      desktopGridRow={props.desktopGridRow}
    >
      <Body1>
        <label>{label}</label>
      </Body1>
      <Input value={value} disabled={disabled} {...register(path)} />
    </TextFieldWrapper>
  );
};

const TextFieldWrapper = styled.div`
  grid-column: ${(props) => props.mobileGridCol};
  grid-row: ${(props) => props.mobileGridRow};
  width: 100%;

  @media (min-width: 480px) {
    grid-column: ${(props) => props.desktopGridCol};
    grid-row: ${(props) => props.desktopGridRow};
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fontSizes.body1};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body1};
  letter-spacing: ${({ theme }) => theme.letterSpacing[1]};
  color: ${({ theme }) => theme.colors.grayBlue};
  padding: 12px;
  margin: 8px 0;
  border-radius: ${({ theme }) => theme.radii[1]};
  border: 1px solid #dfe3fa;
  outline: none;
  width: 100%;
  transition: 300ms ease-in;
  &:focus {
    border-color: #9277ff;
    transition: 300ms ease-out;
  },
`;

export default TextField;
