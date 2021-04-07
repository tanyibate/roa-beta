const referralCodeReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_REFERRAL_CODE":
      return (state = action.referralCode);
    default:
      return state;
  }
};

export default referralCodeReducer;
