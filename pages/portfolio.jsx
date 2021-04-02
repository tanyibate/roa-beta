import React, { useState } from "react";
import Slice from "../components/slice/Slice";
import styles from "../styles/portfolio.module.scss";

export default function portfolio() {
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
