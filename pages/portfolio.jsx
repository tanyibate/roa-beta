import React, { useState } from "react";
import Slice from "../components/slice/Slice";
import styles from "../styles/portfolio.module.scss";
import { getSession, useSession } from "next-auth/client";

export default function portfolio({ user }) {
  const [modalActive, setModalActive] = useState(false);
  return (
    <div className={styles.portfolio_container}>
      <div className={styles.slices_container}>
        <h1>My Slices</h1>
        <Slice />
        <Slice />
        <Slice />
        <button onClick={() => setModalActive(true)}>Buy Another</button>
        {modalActive && (
          <div className={styles.modal}>
            <button onClick={() => setModalActive(false)}>
              Back to My Slices
            </button>

            <div className={styles.progress}>
              <h1>Tier 1</h1>
              <progress id="file" value="32" max="100">
                {" "}
                32%{" "}
              </progress>
              <h2>Invite 2 more friends to unlock another Artist!</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/nextlogin" });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      user: session.user.email,
    },
  };
}
