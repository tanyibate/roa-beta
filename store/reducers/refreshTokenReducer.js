const refreshTokenReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_REFRESH_TOKEN":
      return (state = action.refreshToken);
    default:
      return state;
  }
};

export default refreshTokenReducer;
