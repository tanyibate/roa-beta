import loggedReducer from "./loggedReducer";
import refreshTokenReducer from "./refreshTokenReducer";
import userReducer from "./userReducer";
import accessTokenReducer from "./accessTokenReducer";
import referralCodeReducer from "./referralCodeReducer";
import emailReducer from "./emailReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  loggedIn: loggedReducer,
  refreshToken: refreshTokenReducer,
  user: userReducer,
  accesToken: accessTokenReducer,
  referralCode: referralCodeReducer,
  email: emailReducer,
});

export default allReducers;
