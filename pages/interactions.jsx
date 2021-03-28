import React from "react";
import styles from "../styles/interactions.module.scss";
import Interaction from "../components/interaction/Interaction.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);

export default function interactions() {
  return (
    <div className={styles.interactions_container}>
      <div className={styles.swiper_container}>
        <Swiper
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 25,
            },
            920: { slidesPerView: 2, spaceBetween: 25 },
            1240: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
          }}
          style={{
            margin: "0px",
            minWidth: "100%",
            height: "425px",
          }}
        >
          <SwiperSlide>
            <Interaction />
          </SwiperSlide>
          <SwiperSlide>
            <Interaction />
          </SwiperSlide>
          <SwiperSlide>
            <Interaction />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.swiper_container_large}>
        <Interaction />
        <Interaction />
        <Interaction />
      </div>
    </div>
  );
}
