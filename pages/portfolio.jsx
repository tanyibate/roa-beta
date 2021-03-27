import React from "react";
import Slice from "../components/slice/Slice";
import styles from "../styles/portfolio.module.scss";

export default function portfolio() {
  return (
    <div className={styles.portfolio_container}>
      <div className={styles.slices_container}>
        <h1>Portfolio</h1>
        <Slice />
        <Slice />
        <Slice />
      </div>
    </div>
  );
}
