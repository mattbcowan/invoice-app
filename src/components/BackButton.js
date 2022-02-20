import React from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { BiChevronLeft } from "react-icons/bi";

const BackButton = ({ goBack }) => {
  return (
    <Wrapper>
      <Button onClick={goBack}>
        <IconContext.Provider value={{ color: "#7C5DFA", size: "2em" }}>
          <BiChevronLeft />
        </IconContext.Provider>
        <BackText>Go back</BackText>
      </Button>
    </Wrapper>
  );
};

const BackText = styled.span`
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: -0.25px;
  color: #0c0e16;
`;

const Wrapper = styled.div``;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export default BackButton;
