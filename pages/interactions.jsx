import React from "react";
import styles from "../styles/interactions.module.scss";
import Interaction from "../components/interaction/Interaction.jsx";
import InteractionPaves from "../components/interactionpaves/InteractionPaves";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { getSession, useSession } from "next-auth/client";

SwiperCore.use([Navigation, Pagination]);

export default function interactions({ user }) {
  const arrivals = [
    {
      title: "Coming Soon",
      description: "Coming Soon",
      date: "TBD",
      artist_alias: "EBE Kastro",
    },
    {
      title: "Coming Soon",
      description: "Coming Soon",
      date: "TBD",
      artist_alias: "CHASE PAVES",
    },
  ];
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
            <Interaction arrival={arrivals[1]} />
          </SwiperSlide>
          <SwiperSlide>
            <InteractionPaves arrival={arrivals[0]} />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.swiper_container_large}>
        <Interaction arrival={arrivals[1]} />
        <InteractionPaves arrival={arrivals[0]} />
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
