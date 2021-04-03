import React, { useState, useEffect } from "react";
import ArtistCard from "../../components/ArtistCard";
import { useRouter } from "next/router";
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { getSession, useSession } from "next-auth/client";
import axios from "axios";
import styles from "./styles.module.scss";
SwiperCore.use([Navigation, Pagination]);

export default function index() {
  // configure Swiper to use modules
  const [artists, setArtists] = useState([]);

  // init Swiper:
  const router = useRouter();

  useEffect(() => {
    // Update the document title using the browser API
    axios.get("/api/artists").then((result) => {
      setArtists(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <div className={styles.artist_container}>
      <div className={styles.swipe_container}>
        {
          <Swiper
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
            {artists.map((el, index) => {
              return (
                <SwiperSlide key={index + "slider"}>
                  <ArtistCard artist={el} key={index + "artist-small"} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        }
      </div>
      <div className={styles.swipe_container_large_artists}>
        {artists.map((el, index) => {
          return <ArtistCard artist={el} key={index + "artist-large"} />;
        })}
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
