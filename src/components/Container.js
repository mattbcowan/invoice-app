import React from "react";
import styled from "styled-components";

const Container = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  padding: 2em;
  margin: 2em;
  margin-bottom: 1.5em;
  border-radius: 0.5em;
`;

export default Container;
