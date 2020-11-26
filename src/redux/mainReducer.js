const initialState = {
  merchant: null,
  scannedMerchant: null
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
    default:
      return state;
  }
};

export default mainReducer;
