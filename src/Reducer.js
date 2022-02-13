export const initialState = {
  invoices: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_INVOICE":
      return {
        ...state,
        invoices: [...state.invoices, action.item],
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
