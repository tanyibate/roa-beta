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
    if (event.target.id === "tiktok_rm") {
      link = props.artist.artist_social_media.tiktok;
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
          {props.artist.artist_social_media.spotify && (
            <img
              src="/assets/icons/spotify.svg"
              alt=""
              id="spotify_rm"
              onClick={(event) => openLink(event)}
            />
          )}
          {props.artist.artist_social_media.instagram && (
            <img
              src="/assets/icons/instagram.svg"
              alt=""
              id="instagram_rm"
              onClick={(event) => openLink(event)}
            />
          )}
          {props.artist.artist_social_media.apple_music && (
            <img
              src="/assets/icons/applemusic.png"
              alt=""
              id="apple_music_rm"
              onClick={(event) => openLink(event)}
            />
          )}
          {props.artist.artist_social_media.youtube && (
            <img
              src="/assets/icons/youtube.svg"
              alt=""
              id="youtube_rm"
              onClick={(event) => openLink(event)}
            />
          )}
          {props.artist.artist_social_media.tiktok && (
            <img
              src="/assets/icons/tik-tok.png"
              alt=""
              id="tiktok_rm"
              onClick={(event) => openLink(event)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
