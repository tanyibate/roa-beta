import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>{artist_alias}</h1>
    </div>
  );
}
