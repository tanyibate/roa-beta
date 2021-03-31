import React from "react";
import Slice from "../components/slice/Slice";
import styles from "../styles/portfolio.module.scss";

export default function portfolio() {
  return (
    <div className={styles.portfolio_container}>
      <div className={styles.slices_container}>
        <h1>My Slices</h1>
        <Slice />
        <Slice />
        <Slice />
        <div className={styles.progress}>
          <h1>Tier 1</h1>
          <progress id="file" value="32" max="100">
            {" "}
            32%{" "}
          </progress>
          <h2>Invite 2 more friends to unlock another Artist!</h2>
        </div>
      </div>
    </div>
  );
}
