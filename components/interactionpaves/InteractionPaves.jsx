import React from "react";
import styles from "./interaction.module.scss";

export default function Interaction({ arrival }) {
  return (
    <div className={styles.interaction_container}>
      <div className={styles.interaction_container_overlay}>
        <div className={styles.interaction_content}>
          <div className={styles.interaction_details}>
            <h2>{arrival.title}</h2>
            <h1>{arrival.artist_alias}</h1>
            <p>{arrival.description}</p>
          </div>
          <div className={styles.date}>
            <h3>{arrival.date}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
