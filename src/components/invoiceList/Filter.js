import React, { useState } from "react";
import Select, { components } from "react-select";
import { IconContext } from "react-icons";
import { BiChevronDown } from "react-icons/bi";
import styled from "styled-components";

const filterOptions = [
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
];

const styles = {
  option: (provided, state) => ({
    ...provided,
    color: "#0C0E16",
    backgroundColor: "white",
  }),
  control: (provided, state) => ({
    ...provided,
    minWidth: 192,
    margin: 8,
    display: "none",
    textAlign: "left",
  }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <Checkbox
          checked={props.isSelected}
          onChange={() => null}
          label={props.label}
        />
      </components.Option>
    </div>
  );
};

const Filter = ({ filter, setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setFilter(e);
  };
  return (
    <Dropdown
      isOpen={isOpen}
      target={
        <FilterButton onClick={toggleOpen}>
          Filter{" "}
          <IconContext.Provider value={{ color: "#7C5DFA", size: "2em" }}>
            <span>
              <BiChevronDown />
            </span>
          </IconContext.Provider>
        </FilterButton>
      }
    >
      <Select
        options={filterOptions}
        isMulti
        menuIsOpen
        controlShouldRenderValue={false}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
          LoadingIndicator: null,
        }}
        onChange={handleChange}
        allowSelectAll={true}
        value={filter}
        styles={styles}
      />
    </Dropdown>
  );
};

const Dropdown = ({ target, isOpen, children }) => {
  return (
    <DropdownContainer>
      {target}
      {isOpen ? <Menu>{children}</Menu> : null}
    </DropdownContainer>
  );
};

const Checkbox = ({ checked, onChange, label }) => {
  return (
    <FormControl>
      <input
        type="checkbox"
        name="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <CheckboxLabel htmlFor="checkbox">{label}</CheckboxLabel>
    </FormControl>
  );
};

const CheckboxLabel = styled.label`
  cursor: pointer;
`;

const FormControl = styled.label`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.75em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  cursor: pointer;

  input[type="checkbox"] {
    appearance: none;
    margin: 0;
    background-color: #dfe3fa;
    font: inherit;
    width: 1.15em;
    height: 1.15em;
    border: 3px solid #7c5dfa;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
  }

  input[type="checkbox"]:checked {
    background-color: #7c5dfa;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #ffffff;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }
`;

const Menu = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
  margin-top: 8px;
  position: absolute;
  z-index: 2;
  text-align: left;
  width: 100%;
`;

const DropdownContainer = styled.div`
  position: relative;
  justify-self: end;
  width: 100%;
  text-align: right;
  cursor: pointer;
`;

const FilterButton = styled.a`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.25px;
  font-weight: 700;
`;

export default Filter;
