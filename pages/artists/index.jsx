import React, { useState, useEffect } from "react";
import ArtistCard from "../../components/ArtistCard";
import { useRouter } from "next/router";
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { getSession, useSession } from "next-auth/client";

SwiperCore.use([Navigation, Pagination]);

export default function index() {
  // configure Swiper to use modules

  // init Swiper:
  const router = useRouter();

  useEffect(() => {
    // Update the document title using the browser API
  }, []);

  return (
    <div className="artist-container">
      <div className="swiper-container">
        {
          <Swiper
            className="swiper"
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 25,
              },
              840: { slidesPerView: 2, spaceBetween: 25 },
              1160: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
            }}
            style={{
              margin: "0px",
              minWidth: "100%",
              height: "550px",
            }}
          >
            <SwiperSlide>
              <ArtistCard />
            </SwiperSlide>
            <SwiperSlide>
              <ArtistCard />
            </SwiperSlide>
            <SwiperSlide>
              <ArtistCard />
            </SwiperSlide>
          </Swiper>
        }
      </div>
      <div className="swiper-container-large-artists">
        <ArtistCard />
        <ArtistCard />
        <ArtistCard />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/nextlogin" });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      user: session.user.email,
    },
  };
}
