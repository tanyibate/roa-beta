import React from "react";
import styles from "./slice.module.scss";

function slice() {
  return (
    <div className={styles.slice_container_underlay}>
      <div className={styles.slice_container}>
        <div className={styles.artist_image_container}>
          <img
            src="https://yt3.ggpht.com/ytc/AAUvwniFM4h3iOlRCk5VDjbKkWjNRuDntpo3pNm8-TpLXg=s900-c-k-c0x00ffffff-no-rj"
            alt=""
            className={styles.artist_image}
          />
        </div>

        <div className={styles.slice_contents}>
          <div className={styles.slice_details}>
            <h3>EBE Kastro</h3>
            <p>1 slice</p>
          </div>
          <div className={styles.slice_price}>
            <img
              src="/assets/slice.png"
              alt=""
              className={styles.slice_price_image}
            />
            <p>$5.00</p>
            <button>Buy More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default slice;
