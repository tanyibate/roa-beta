import React from "react";
import styles from "../styles/interactions.module.scss";
import Interaction from "../components/interaction/Interaction.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { getSession, useSession } from "next-auth/client";

SwiperCore.use([Navigation, Pagination]);

export default function interactions({ user }) {
  return (
    <div className={styles.interactions_container}>
      <h1>Arrivals</h1>
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

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      user: session.user.email,
    },
  };
}
