import React from "react";
import styles from "./slice.module.scss";

function slice(props) {
  return (
    <div className={styles.slice_container_underlay}>
      <div className={styles.slice_container}>
        <div className={styles.artist_image_container}>
          <img
            src={props.artist.artist_slice_image_url}
            alt=""
            className={styles.artist_image}
          />
        </div>

        <div className={styles.slice_contents}>
          <div className={styles.slice_details}>
            <h3>{props.artist.artist_alias}</h3>
            <p>1 slice</p>
          </div>
          <div className={styles.slice_price}>
            <p>$5.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default slice;
