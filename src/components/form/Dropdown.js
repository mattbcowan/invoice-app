import React, { useState } from "react";
import styled from "styled-components";
import { BiChevronDown } from "react-icons/bi";

const Dropdown = ({
  register,
  label,
  path,
  defaultValue,
  options,
  value,
  setValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(defaultValue);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const setSelection = (selection) => {
    setTitle(selection);
    setValue(`${path}`, selection);
    setIsOpen(false);
  };

  return (
    <Container>
      <Hidden type="text" {...register(path)} value={value} />
      <span>{label}</span>
      <Container>
        <Title type="button" onClick={toggleList}>
          <TitleContainer>
            {title} <BiChevronDown />
          </TitleContainer>
        </Title>
        {isOpen && (
          <Wrapper>
            <Flexbox>
              {options.map((option, i) => {
                return (
                  <Option
                    key={i}
                    type="button"
                    onClick={() => setSelection(option)}
                  >
                    {option}
                  </Option>
                );
              })}
            </Flexbox>
          </Wrapper>
        )}
      </Container>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
  border-radius: ${({ theme }) => theme.radii[2]};
  margin-bottom: 16px;
`;

const Flexbox = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const Title = styled.button`
  box-sizing: border-box;
    font-size: ${({ theme }) => theme.fontSizes.body1};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    letter-spacing: ${({ theme }) => theme.letterSpacing.body1};
    line-height: ${({ theme }) => theme.lineHeights[0]};
    border-radius: ${({ theme }) => theme.radii[1]};
    border: 1px solid #dfe3fa;
    outline: none;
    background: transparent;
    textAlign: left;
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    &:focus {
      border-color: #9277ff,
    },
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Option = styled.button`
box-sizing: border-box;
    font-size: ${({ theme }) => theme.fontSizes.body1};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    letter-spacing: ${({ theme }) => theme.letterSpacing.body1};
    line-height: ${({ theme }) => theme.lineHeights[0]};
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
    background: transparent;
    cursor: pointer;
    text-align: left;
    padding: 16px;
    &:last-child {
      border-bottom: none;
    },
    &:hover {
      color: ${({ theme }) => theme.colors.darkPurple};
    },
`;

const Hidden = styled.input`
  display: none;
`;

export default Dropdown;
