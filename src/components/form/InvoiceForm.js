import React, { useEffect, useState } from "react";
import { auth, db, saveInvoice } from "../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LineItems from "./LineItems";
import { invoiceSchema } from "../../schema";
import { useLocation } from "react-router-dom";
import { get, ref } from "firebase/database";
import FormInput from "./FormInput";
import inputList from "./inputList.json";

const InvoiceForm = ({ modal }) => {
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
          {isAddMode ? <h1>New Invoice</h1> : <h1>Edit #{invoiceId}</h1>}
          <fieldset>
            <legend>Bill From</legend>
            {inputList.bill_from.map((listItem) => {
              return (
                <FormInput
                  key={listItem.label}
                  register={register}
                  label={listItem.label}
                  path={listItem.path}
                  type={listItem.type}
                  options={listItem.options && listItem.options}
                  defaultValue={listItem.defaultValue && listItem.defaultValue}
                />
              );
            })}
          </fieldset>
          <fieldset>
            <legend>Bill To</legend>
            {inputList.bill_to.map((listItem) => {
              return (
                <FormInput
                  key={listItem.label}
                  register={register}
                  label={listItem.label}
                  path={listItem.path}
                  type={listItem.type}
                  options={listItem.options && listItem.options}
                  defaultValue={listItem.defaultValue && listItem.defaultValue}
                />
              );
            })}
          </fieldset>
          <LineItems
            {...{ control, watch, register, getValues, setValue, errors }}
          />
          <div>
            {isAddMode ? (
              <div>
                <input
                  type="button"
                  value="Discard"
                  onClick={() => modal.current.close()}
                />
                <input
                  type="submit"
                  value="Save as Draft"
                  onClick={setValue("status", "Draft")}
                />
                <input
                  type="submit"
                  value="Save & Send"
                  onClick={setValue("status", "Pending")}
                />
              </div>
            ) : (
              <div>
                <input
                  type="button"
                  value="Cancel"
                  onClick={() => modal.current.close()}
                />
                <input type="submit" value="Save Changes" />
              </div>
            )}
          </div>
        </form>
      }
    </div>
  );
};

export default InvoiceForm;
