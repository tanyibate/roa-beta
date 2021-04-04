import React from "react";
import styles from "./interaction.module.scss";

export default function Interaction() {
  return (
    <div className={styles.interaction_container}>
      <div className={styles.interaction_container_overlay}>
        <div className={styles.interaction_content}>
          <div className={styles.interaction_details}>
            <h2>Sit down</h2>
            <h1>EBE Kastro</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Inventore nam ut molestiae voluptates, amet iste?
            </p>
          </div>
          <div className={styles.date}>
            <h3>TBD</h3>
          </div>
        </div>
      </div>
    </div>
  );
}