import React from "react";
import styled from "styled-components";
import { Body1 } from "../Typography";

const TextField = ({ register, label, path, disabled, value }) => {
  return (
    <TextFieldWrapper>
      <Body1>
        <label>{label}</label>
      </Body1>
      <Input value={value} disabled={disabled} {...register(path)} />
    </TextFieldWrapper>
  );
};

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  transition: 300ms ease-in;
  &:focus {
    border-color: #9277ff;
    transition: 300ms ease-out;
  },
`;

export default TextField;
