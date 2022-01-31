import * as yup from "yup";

export const invoiceSchema = yup
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
    status: yup.string(),
    line_items: yup.array().min(1),
  })
  .required();
