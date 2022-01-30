import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LineItems from "./LineItems";

const schema = yup
  .object({
    bill_from_info: yup.object().shape({
      street_name: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      zip_code: yup.string().required(),
      country: yup.string().required(),
    }),
    bill_to_info: yup.object().shape({
      street_name: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      zip_code: yup.string().required(),
      country: yup.string().required(),
      client_name: yup.string().required(),
      client_email: yup.string().required(),
      invoice_date: yup.string().required(),
      payment_terms: yup.string().required(),
      project_description: yup.string().required(),
    }),
  })
  .required();

const InvoiceForm = () => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const saveData = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit((data) => saveData(data))}>
      <h1>New Invoice</h1>
      <fieldset>
        <legend>Bill From</legend>
        <label>Street Address</label>
        <input
          {...register("bill_from_info.street_name", {
            required: true,
          })}
        />
        <label>City</label>
        <input {...register("bill_from_info.city", { required: true })} />
        <label>State</label>
        <input {...register("bill_from_info.state", { required: true })} />
        <label>Zip Code</label>
        <input {...register("bill_from_info.zip_code", { required: true })} />
        <label>Country</label>
        <input {...register("bill_from_info.country", { required: true })} />
      </fieldset>
      <fieldset>
        <legend>Bill To</legend>
        <label>Client's Name</label>
        <input {...register("bill_to_info.client_name", { required: true })} />
        <label>Client's Email</label>
        <input {...register("bill_to_info.client_email", { required: true })} />
        <label>Street Address</label>
        <input {...register("bill_to_info.street_name", { required: true })} />
        <label>City</label>
        <input {...register("bill_to_info.city", { required: true })} />
        <label>State</label>
        <input {...register("bill_to_info.state", { required: true })} />
        <label>Zip Code</label>
        <input {...register("bill_to_info.zip_code", { required: true })} />
        <label>Country</label>
        <input {...register("bill_to_info.country", { required: true })} />
        <label>Invoice Date</label>
        <input {...register("bill_to_info.invoice_date", { required: true })} />
        <label>Payment Terms</label>
        <input
          {...register("bill_to_info.payment_terms", {
            required: true,
          })}
        />
        <label>Project Description</label>
        <input
          {...register("bill_to_info.project_description", {
            required: true,
          })}
        />
      </fieldset>
      <LineItems
        {...{ control, watch, register, getValues, setValue, errors }}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default InvoiceForm;
