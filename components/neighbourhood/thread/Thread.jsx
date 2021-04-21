import React from "react";
import styles from "./thread.module.scss";

function slice(props) {
  return (
    <div className={styles.thread_container_underlay}>
      <div className={styles.thread_container}>
        <div className={styles.thread_opinion}>
          <div className={styles.thread_upvote}>+</div>
          <div className={styles.thread_opinion_count}>0</div>
          <div className={styles.thread_downvote}>-</div>
        </div>
        <div className={styles.thread_content}></div>
      </div>
    </div>
  );
}

export default slice;
