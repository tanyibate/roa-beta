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

  useEffect(async () => {
    // Update the document title using the browser API
    const getArtists = async () => {
      let artists = await axios.get("/api/artists");
      artists = artists.data;
      for (let i = 0; i < artists.length; i++) {
        let slices = await axios.get(`/api/slices/${artists[i].id}`);
        slices = slices.data;
        artists[i].slices = slices;
      }
      console.log(artists);
      setArtists(artists);
    };
    getArtists();
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
