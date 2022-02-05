import React from "react";
import styled from "styled-components";

const Button = ({ onClick, children }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

const Wrapper = styled.button`
  background-color: #7c5dfa;
  color: #ffffff;
  font-size: 15px;
  padding: 1.5em;
  border-radius: 5em;
  border: none;
`;

export default Button;
