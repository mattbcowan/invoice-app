import React from "react";
import ReactSelect, { components } from "react-select";

// For when you get to styling the filter
// https://react-select.com/advanced#experimental

const filterOptions = [
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
];

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
  const handleChange = (e) => {
    setFilter(e);
  };
  return (
    <div>
      <ReactSelect
        options={filterOptions}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{ Option }}
        onChange={handleChange}
        allowSelectAll={true}
        value={filter}
      />
    </div>
  );
};

export default Filter;
