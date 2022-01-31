import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { db } from "../firebase";
import LineItems from "./LineItems";
import { get, ref, update } from "firebase/database";
import { getAuth } from "firebase/auth";

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
  const auth = getAuth();
  const userId = auth.currentUser.uid;
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

  const padLeadingZeros = (num, size) => {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  };

  const createInvoiceNumber = async () => {
    let invoiceNumber = 1;
    const invoicesRef = ref(db, `users/${userId}/invoices`);
    await get(invoicesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const numberOfInvoices = Object.keys(snapshot.val()).length;
          return (invoiceNumber = numberOfInvoices + 1);
        } else {
          return (invoiceNumber = 1);
        }
      })
      .catch((err) => console.error(err));

    invoiceNumber = `XM${padLeadingZeros(invoiceNumber, 4)}`;
    return invoiceNumber;
  };

  const saveData = async (data) => {
    await createInvoiceNumber().then((number) => {
      console.log(number);
      let invoice = {};
      invoice[number] = data;
      update(ref(db, `users/${userId}/invoices/`), invoice);
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        saveData(data);
      })}
    >
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
