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
      return {
        ...state,
        invoices: [...state.invoices, action.invoice],
      };
    case "UPDATE_INVOICE":
      console.log(state.invoices);
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
