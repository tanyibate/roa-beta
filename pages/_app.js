import "../styles/globals.scss";
import Sidebar from "../components/sidebar/SideBar.jsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LogIn from "./login/index";
import { Provider } from "react-redux";
import persistedStore from "../store/index";
import actions from "../store/actions/index";
import { PersistGate } from "redux-persist/integration/react";
let pStore = persistedStore();
let store = pStore.store;
let persistor = pStore.persistor;

function MyApp({ Component, pageProps }) {
  //const [allowed, SetAllowed] = useState(true);
  const router = useRouter();
  let allowed = false;
  let route = router.pathname;

  if (
    router.pathname.startsWith("/login") ||
    router.pathname.startsWith("/register") ||
    store.getState().loggedIn
  ) {
    allowed = true;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          {store.getState().loggedIn && <Sidebar />}
          {allowed ? <Component {...pageProps} /> : <LogIn />}
        </>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
