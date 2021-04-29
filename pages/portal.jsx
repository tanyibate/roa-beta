import styles from "../styles/portal.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { getSession, useSession } from "next-auth/client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Portal({ accessToken }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/tribetoken")
      .then((res) => {
        setToken(res.data.token);
        setLoading(false);
      })
      .catch(() => {
        alert(
          "ROA Neighborhood login failed please try again or contact us through the contact page"
        );
      });
  }, []);

  return (
    <div className={styles.portal_container}>
      {loading && <div className={styles.loader}></div>}
      {!loading && (
        <iframe
          src={`https://community.roabeta.com/auth/sso?ssoToken=${token}`}
          frameBorder="0"
          allowtransparency="true"
          style={{
            minHeight: "300px",
            height: "100%",
            width: "100%",
            padding: "0",
          }}
        ></iframe>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      accessToken: session.accessToken,
    },
  };
}
