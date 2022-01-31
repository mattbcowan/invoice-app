import { getAuth } from "firebase/auth";
import { get, ref } from "firebase/database";
import { db } from "./firebase";
const auth = getAuth();
const userId = auth.currentUser.uid;

const padLeadingZeros = (num, size) => {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

export const createInvoiceNumber = async () => {
  const invoicesRef = ref(db, `users/${userId}/invoices`);
  let invoiceNumber = 1;
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
