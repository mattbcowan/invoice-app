import React from "react";
import styled from "styled-components";

const Button = ({ onClick, children }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

const Wrapper = styled.button`
  background-color: #7c5dfa;
  color: #ffffff;
  font-size: 15px;
  padding: 0.25em;
  padding-right: 1em;
  border-radius: 5em;
  border: none;
  display: flex;
  align-items: center;
`;

export default Button;
