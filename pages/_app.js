import "../styles/globals.scss";
import "react-tabs/style/react-tabs.css";
import HttpsRedirect from "react-https-redirect";
import * as gtag from "../lib/gtag";

import Sidebar from "../components/sidebar/SideBar.jsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LogIn from "./login/index";
import { Provider as ReduxProvider } from "react-redux";
import persistedStore from "../store/index";
import actions from "../store/actions/index";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "next-auth/client";

let pStore = persistedStore();
let store = pStore.store;
let persistor = pStore.persistor;

function MyApp({ Component, pageProps }) {
  //const [allowed, SetAllowed] = useState(true);
  const router = useRouter();
  /*let allowed = false;
  let showSidebar = false;
  let route = router.pathname;

  if (
    router.pathname.startsWith("/login") ||
    router.pathname.startsWith("/register") ||
    router.pathname.startsWith("/") ||
    store.getState().loggedIn
  ) {
    allowed = true;
  }

  if (router.pathname.startsWith("/") || store.getState().loggedIn) {
    showSidebar = true;
  }*/
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <HttpsRedirect>
      <Provider session={pageProps.session}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <>
              <Sidebar />
              <Component {...pageProps} />
            </>
          </PersistGate>
        </ReduxProvider>
      </Provider>
    </HttpsRedirect>
  );
}

export default MyApp;
