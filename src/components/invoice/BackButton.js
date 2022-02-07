import React from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { BiChevronLeft } from "react-icons/bi";

const BackButton = ({ navigate }) => {
  return (
    <Wrapper>
      <a onClick={() => navigate(-1)}>
        <IconContext.Provider value={{ color: "#7C5DFA", size: "2em" }}>
          <BiChevronLeft />
        </IconContext.Provider>
        <BackText>Go back</BackText>
      </a>
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

const Wrapper = styled.div`
  margin-top: 1em;
  cursor: pointer;
`;

export default BackButton;
