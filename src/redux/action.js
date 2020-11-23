export const login = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};



export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const userMerchants = (data) => {
  return {
    type: "FETCH_USER_MERCHANTS",
    payload: data,
  };
};



