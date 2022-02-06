import React from "react";

const FormInput = ({ register, label, path, type, options, defaultValue }) => {
  return (
    <>
      <label>{label}</label>
      {type === "select" ? (
        <select {...register(path)} defaultValue={defaultValue}>
          {options.map((selection) => {
            return (
              <option key={selection.value} value={selection.value}>
                {selection.label}
              </option>
            );
          })}
        </select>
      ) : (
        <input type={type} {...register(path)} />
      )}
    </>
  );
};

export default FormInput;
