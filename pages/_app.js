import "../styles/globals.scss";
import Sidebar from "../components/sidebar/SideBar.jsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Artists from "./artists/index";

function MyApp({ Component, pageProps }) {
  const [allowed, SetAllowed] = useState(true);
  const router = useRouter();
  let bool = true;
  let route = router.pathname;

  if (route === "/") bool = false;

  return (
    <>
      <Sidebar />
      {bool ? <Component {...pageProps} /> : <Artists />}
    </>
  );
}

export default MyApp;
