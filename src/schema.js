import * as yup from "yup";

export const invoiceSchema = yup
  .object({
    bill_from_info: yup.object().shape({
      street_name: yup.string(),
      city: yup.string(),
      state: yup.string(),
      zip_code: yup.string(),
      country: yup.string(),
    }),
    bill_to_info: yup.object().shape({
      street_name: yup.string(),
      city: yup.string(),
      state: yup.string(),
      zip_code: yup.string(),
      country: yup.string(),
      client_name: yup.string(),
      client_email: yup.string(),
      invoice_date: yup.string(),
      payment_terms: yup.string(),
      project_description: yup.string(),
    }),
    status: yup.string(),
    line_items: yup.array().min(1),
    id: yup.string(),
  })
  .required();
