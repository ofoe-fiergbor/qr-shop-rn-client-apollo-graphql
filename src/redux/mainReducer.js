const initialState = {
  merchant: null,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_MERCHANTS":
      return {
        ...state,
        merchant: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
