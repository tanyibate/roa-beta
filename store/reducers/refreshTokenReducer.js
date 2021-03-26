const refreshTokenReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_REFRESH_TOKEN":
      return (state = action.refreshToken);
    case "LOG_OUT":
      return (state = "");
    default:
      return state;
  }
};

export default refreshTokenReducer;
