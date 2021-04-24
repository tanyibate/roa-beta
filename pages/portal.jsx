import styles from "../styles/portal.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { getSession, useSession } from "next-auth/client";

export default function Portal({ accessToken }) {
  const router = useRouter();
  return (
    <div className={styles.portal_container}>
      <iframe
        src={`https://community.rogueonarrival.com/auth/sso?ssoToken=${accessToken}&redirect=/answers`}
        frameBorder="0"
        allowtransparency="true"
        style={{
          minHeight: "300px",
          height: "100%",
          width: "100%",
          padding: "0",
        }}
      ></iframe>
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
