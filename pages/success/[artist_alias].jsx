import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/success.module.scss";
import useWindowSize from "react-use/lib/useWindowSize";

import Confetti from "react-confetti";

export default function artist_alias() {
  const [artist, setArtist] = useState({});
  const router = useRouter();
  const { artist_alias } = router.query;
  const { width, height } = useWindowSize();

  useEffect(() => {
    const path = window.location.pathname;
    const splitPath = path.split("/");
    const artist = splitPath[splitPath.length - 1];
    axios
      .post(`/api/artists/artist`, { artist_alias: artist })
      .then((res) => {
        console.log(res.data[0]);
        setArtist(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles.success_container}>
      <Confetti width={width} height={height} />
      <h1>Thank you for your purchase.</h1>
      <div className={styles.text_container}>
        {artist.artist_image_url && (
          <img src={artist.artist_image_url} alt="" />
        )}
        Watch out for upcoming arrivals with {artist.artist_alias} on the
        arrivals page!!!
      </div>
    </div>
  );
}
