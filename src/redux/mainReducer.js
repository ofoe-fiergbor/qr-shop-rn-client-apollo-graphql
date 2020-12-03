const initialState = {
  merchant: null,
  scannedMerchant: null,
  selectedItems: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_MERCHANTS":
      return {
        ...state,
        merchant: action.payload,
      };

    case "SCANNED_MERCHANTS":
      return {
        ...state,
        scannedMerchant: action.payload,
      };

    case "SELECTED_ITEMS":
      return {
        ...state,
        selectedItems: state.selectedItems.concat(action.payload),
      };
    default:
      return state;
  }
};

export default mainReducer;
