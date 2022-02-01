import React, { useEffect, useState } from "react";
import { auth, db, saveInvoice } from "../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LineItems from "./LineItems";
import { invoiceSchema } from "../schema";
import { useLocation } from "react-router-dom";
import { get, ref } from "firebase/database";

const InvoiceForm = () => {
  let location = useLocation();
  const invoiceId = location.pathname.slice(10, 16);
  const [loading, setLoading] = useState(null);
  const isAddMode = !invoiceId;
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

  useEffect(() => {
    setLoading(true);

    if (!isAddMode && invoiceId !== "") {
      const userRef = ref(
        db,
        `users/${auth.currentUser.uid}/invoices/${invoiceId}`
      );
      get(userRef)
        .then((snapshot) => {
          return snapshot.val();
        })
        .then((res) => {
          const fields = [
            "bill_from_info",
            "bill_to_info",
            "status",
            "line_items",
          ];
          fields.forEach((field) => setValue(field, res[field]));
        });
    }
    setLoading(false);
  }, [isAddMode, invoiceId, setValue]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {
        <form
          onSubmit={handleSubmit((data) => {
            saveInvoice(data, isAddMode, invoiceId);
          })}
        >
          {isAddMode ? <h1>New Invoice</h1> : <h1>{invoiceId}</h1>}
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
          <LineItems
            {...{ control, watch, register, getValues, setValue, errors }}
          />
          <input type="submit" value="Submit" />
        </form>
      }
    </div>
  );
};

export default InvoiceForm;
