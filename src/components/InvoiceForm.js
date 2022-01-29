import React from "react";
import { useForm } from "react-hook-form";

const InvoiceForm = () => {
  const { register, handleSubmit } = useForm();

  const saveData = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit((data) => saveData(data))}>
      <h1>New Invoice</h1>
      <h3>Bill From</h3>
      <label>Street Address</label>
      <input
        name="street_name"
        {...register("street_name", { required: true })}
      />
      <label>City</label>
      <input name="city" {...register("city", { required: true })} />
      <label>State</label>
      <input name="state" {...register("state", { required: true })} />
      <label>Zip Code</label>
      <input name="zip_code" {...register("zip_code", { required: true })} />
      <label>Country</label>
      <input name="country" {...register("country", { required: true })} />
      <input type="submit" />
    </form>
  );
};

export default InvoiceForm;
