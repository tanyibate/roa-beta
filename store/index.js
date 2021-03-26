import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);
export default () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware()
      // other store enhancers if any
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
