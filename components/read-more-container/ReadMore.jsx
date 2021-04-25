import React from "react";
import styles from "./styles.module.scss";

export default function ReadMore(props) {
  console.log(props);
  function openLink(event) {
    let link;
    if (event.target.id === "spotify_rm") {
      link = props.artist.artist_social_media.spotify;
    }
    if (event.target.id === "instagram_rm") {
      link = props.artist.artist_social_media.instagram;
    }
    if (event.target.id === "youtube_rm") {
      link = props.artist.artist_social_media.youtube;
    }
    if (event.target.id === "apple_music_rm") {
      link = props.artist.artist_social_media.apple_music;
    }
    window.open(link, "_blank");
  }
  return (
    <div className={styles.read_more_container}>
      <div className={styles.background}></div>
      <div className={styles.artist_card}>
        <p className={styles.cancel} onClick={props.cancel}>
          X
        </p>
        <h1>{props.artist.artist_alias}</h1>
        <img
          src={`${props.artist.artist_image_url}`}
          alt=""
          className={styles.artist_image}
        />
        <p>{props.artist.artist_description}</p>
        <div className={styles.artist_social_media}>
          <img
            src="/assets/icons/spotify.svg"
            id="spotify_rm"
            alt=""
            onClick={(event) => openLink(event)}
          />
          <img
            src="/assets/icons/instagram.svg"
            id="instagram_rm"
            alt=""
            onClick={(event) => openLink(event)}
          />
          <img
            src="/assets/icons/applemusic.png"
            id="apple_music_rm"
            alt=""
            onClick={(event) => openLink(event)}
          />
          <img
            src="/assets/icons/youtube.svg"
            id="youtube_rm"
            alt=""
            onClick={(event) => openLink(event)}
          />
        </div>
      </div>
    </div>
  );
}
