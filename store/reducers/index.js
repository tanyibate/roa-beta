import loggedReducer from "./loggedReducer";
import refreshTokenReducer from "./refreshTokenReducer";
import userReducer from "./userReducer";
import accessTokenReducer from "./accessTokenReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  loggedIn: loggedReducer,
  refreshToken: refreshTokenReducer,
  user: userReducer,
  accesToken: accessTokenReducer,
});

export default allReducers;
