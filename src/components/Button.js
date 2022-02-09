import React from "react";
import styled from "styled-components";

export const Button = ({ onClick, children, backgroundColor, color }) => {
  return (
    <Wrapper backgroundColor={backgroundColor} color={color} onClick={onClick}>
      {children}
    </Wrapper>
  );
};

export const IconButton = ({ onClick, children, backgroundColor, color }) => {
  return (
    <WrapperIcon
      backgroundColor={backgroundColor}
      color={color}
      onClick={onClick}
    >
      {children}
    </WrapperIcon>
  );
};

const Wrapper = styled.button`
  background-color: ${(props) => props.backgroundColor || "#7c5dfa"};
  color: ${(props) => props.color || "#ffffff"};
  font-size: 12px;
  line-height: 15px;
  padding: 1.5em 1.5em;
  border-radius: 5em;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const WrapperIcon = styled.button`
  background-color: ${(props) => props.backgroundColor || "#7c5dfa"};
  color: ${(props) => props.color || "#ffffff"};
  font-size: 12px;
  line-height: 15px;
  padding: 0.25em;
  padding-right: 1em;
  border-radius: 5em;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
