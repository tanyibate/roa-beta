import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/success.module.scss";

export default function artist_alias() {
  const [artist, setArtist] = useState({});
  const router = useRouter();
  const { artist_alias } = router.query;

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
      <div></div>
      <h1>
        Thank you for buying a {artist.artist_alias} slice! Watch out for
        upcoming arrivals{" "}
      </h1>
    </div>
  );
}
