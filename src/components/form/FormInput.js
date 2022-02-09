import React from "react";
import styled from "styled-components";

const FormInput = ({
  register,
  label,
  path,
  type,
  placeholder,
  options,
  defaultValue,
}) => {
  return (
    <Wrapper>
      <InputLabel>{label}</InputLabel>
      {type === "select" ? (
        <StyledSelect {...register(path)} defaultValue={defaultValue}>
          {options.map((selection) => {
            return (
              <option key={selection.value} value={selection.value}>
                {selection.label}
              </option>
            );
          })}
        </StyledSelect>
      ) : (
        <StyledInput
          type={type}
          {...register(path)}
          placeholder={placeholder}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1em;
`;

const InputLabel = styled.label`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.25px;
  color: #7e88c3;
  margin-bottom: 0.75em;
`;

const StyledInput = styled.input`
  font-size: 12px;
  line-height: 15px;
  font-weight: 700;
  letter-spacing: -0.25px;
  color: #0c0e16;
  padding: 1em;
  border: 1px solid #dfe3fa;
  border-radius: 0.5em;
`;

const StyledSelect = styled.select`
  font-size: 12px;
  line-height: 15px;
  font-weight: 700;
  letter-spacing: -0.25px;
  color: #0c0e16;
  padding: 1em;
  border: 1px solid #dfe3fa;
  border-radius: 0.5em;
  background-color: #ffffff;
`;

export default FormInput;
