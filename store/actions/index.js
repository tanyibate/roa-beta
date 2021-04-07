export const logIn = () => {
  return {
    type: "LOG_IN",
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

export const setAccessToken = (accessToken) => {
  return {
    type: "SET_ACCESS_TOKEN",
    accessToken,
  };
};
export const setReferralCode = (referralCode) => {
  return {
    type: "SET_REFERRAL_CODE",
    referralCode,
  };
};

export const setRefreshToken = (refreshToken) => {
  return {
    type: "SET_REFRESH_TOKEN",
    refreshToken,
  };
};

/*module.exports = {
  logIn,
  logOut,
  setUser,
  setAccessToken,
  setRefreshToken,
};*/
