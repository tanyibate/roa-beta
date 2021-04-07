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
  const [modalActive, setModalActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [level, setLevel] = useState(1);
  const [referralCode, setReferralCode] = useState(0);

  // init Swiper:
  const router = useRouter();
  const updateModal = (message, level, referralCode) => {
    setModalActive(true);
    setErrorMessage(message);
    setLevel(level);
    setReferralCode(referralCode);
  };

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
                  <ArtistCard
                    artist={el}
                    key={index + "artist-small"}
                    updateModal={updateModal}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        }
      </div>
      <div className={styles.swipe_container_large_artists}>
        {artists.map((el, index) => {
          return (
            <ArtistCard
              artist={el}
              key={index + "artist-large"}
              updateModal={updateModal}
            />
          );
        })}
      </div>
      {modalActive && (
        <div className={styles.modal}>
          <button onClick={() => setModalActive(false)}>Back to Artists</button>
          <h2>{errorMessage}</h2>
          <div className={styles.progress}>
            <h1>{`Tier ${level}`}</h1>

            <progress id="file" value={`${(level / 3) * 100}`} max="100">
              {" "}
              {`${(level / 3) * 100}`}{" "}
            </progress>
            <h3>Referral Link</h3>
            <input
              type="text"
              value={`${process.env.NEXT_PUBLIC_APP_URL}/register/${referralCode}`}
              readOnly
            />
          </div>
        </div>
      )}
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
