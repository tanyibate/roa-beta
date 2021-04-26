import React, { useState, useEffect } from "react";
import ArtistCard from "../../components/ArtistCard";
import { useRouter } from "next/router";
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { getSession, useSession } from "next-auth/client";
import axios from "axios";
import styles from "./styles.module.scss";
import ReadMore from "../../components/read-more-container/ReadMore";
SwiperCore.use([Navigation, Pagination]);

export default function index() {
  // configure Swiper to use modules
  const [artists, setArtists] = useState([]);
  const [artistInFocus, setArtistInFocus] = useState({});
  const [modalActive, setModalActive] = useState(false);
  const [readMoreActive, setReadMoreActive] = useState(false);
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
  const activateReadMore = (artist) => {
    setArtistInFocus(artist);
    setReadMoreActive(!readMoreActive);
  };

  useEffect(async () => {
    // Update the document title using the browser API
    const getArtists = async () => {
      let artists = await axios.get("/api/artists");
      artists = artists.data;
      console.log(artists);
      setArtists(artists);
    };
    getArtists();
  }, []);

  return (
    <div className={styles.artist_container}>
      <h1 style={{ marginBottom: "3px" }}>Artists</h1>
      <div className={styles.swipe_container}>
        {
          <Swiper
            navigation
            loop="true"
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
                    readMore={activateReadMore}
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
              readMore={activateReadMore}
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
      {readMoreActive && (
        <ReadMore cancel={activateReadMore} artist={artistInFocus} />
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
