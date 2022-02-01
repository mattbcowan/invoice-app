import React from "react";
import { saveInvoice } from "../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LineItems from "./LineItems";
import { invoiceSchema } from "../schema";

const ClientFields = ({ register }) => {
  return (
    <fieldset>
      <legend>Bill To</legend>
      <label>Client's Name</label>
      <input {...register("bill_to_info.client_name")} />
      <label>Client's Email</label>
      <input type="email" {...register("bill_to_info.client_email")} />
      <label>Street Address</label>
      <input {...register("bill_to_info.street_name")} />
      <label>City</label>
      <input {...register("bill_to_info.city")} />
      <label>State</label>
      <input {...register("bill_to_info.state")} />
      <label>Zip Code</label>
      <input {...register("bill_to_info.zip_code")} />
      <label>Country</label>
      <input {...register("bill_to_info.country")} />
      <label>Invoice Date</label>
      <input type="date" {...register("bill_to_info.invoice_date")} />
      <label>Payment Terms</label>
      <input {...register("bill_to_info.payment_terms")} />
      <label>Project Description</label>
      <input {...register("bill_to_info.project_description")} />
    </fieldset>
  );
};

const UserFields = ({ register }) => {
  return (
    <fieldset>
      <legend>Bill From</legend>
      <label>Street Address</label>
      <input {...register("bill_from_info.street_name")} />
      <label>City</label>
      <input {...register("bill_from_info.city")} />
      <label>State</label>
      <input {...register("bill_from_info.state")} />
      <label>Zip Code</label>
      <input {...register("bill_from_info.zip_code")} />
      <label>Country</label>
      <input {...register("bill_from_info.country")} />
    </fieldset>
  );
};

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
    resolver: yupResolver(invoiceSchema),
    defaultValues: { status: "Pending", line_items: [] },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        saveInvoice(data);
      })}
    >
      <h1>New Invoice</h1>
      <UserFields register={register} />
      <ClientFields register={register} />
      <LineItems
        {...{ control, watch, register, getValues, setValue, errors }}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default InvoiceForm;
