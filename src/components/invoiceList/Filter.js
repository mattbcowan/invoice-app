import React, { useState } from "react";
import Select, { components } from "react-select";
import { IconContext } from "react-icons";
import { BiChevronDown } from "react-icons/bi";
import styled from "styled-components";

// For when you get to styling the filter
// https://react-select.com/advanced#experimental

const filterOptions = [
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
];

const styles = {
  control: (provided, state) => ({
    ...provided,
    display: "none",
  }),
};

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label>{props.label}</label>
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
    <div>
      {target}
      {isOpen ? <div>{children}</div> : null}
    </div>
  );
};

const FilterButton = styled.a`
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export default Filter;