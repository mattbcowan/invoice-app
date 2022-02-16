import { getDatabase, ref, set, update } from "firebase/database";
import { createInvoiceNumber } from "./formatting";

const db = getDatabase();

export const initialState = {
  invoices: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INVOICES":
      return {
        ...state,
        invoices: [...action.invoices],
      };
    case "ADD_INVOICE":
      const invoiceNum = createInvoiceNumber(state.invoices.length + 1);
      const newInvoice = { ...action.invoice, id: invoiceNum };
      set(ref(db, `users/${state.user.uid}/invoices/`), [
        ...state.invoices,
        newInvoice,
      ]);
      return {
        ...state,
        invoices: [...state.invoices, newInvoice],
      };
    case "UPDATE_INVOICE":
      const index = state.invoices.findIndex(
        (obj) => obj.id == action.invoice.id
      );

      const updates = {};
      updates[`users/${state.user.uid}/invoices/${index}`] = action.invoice;
      update(ref(db), updates);
      let newState = [...state.invoices];
      newState[index] = action.invoice;
      return {
        ...state,
        invoices: newState,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
