import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/client";
import axios from "axios";

export default function ArtistCard(props) {
  const [session] = useSession();
  function openLink(event) {
    let link;
    if (event.target.id === "spotify") {
      link = props.artist.artist_social_media.spotify;
    }
    if (event.target.id === "instagram") {
      link = props.artist.artist_social_media.instagram;
    }
    if (event.target.id === "youtube") {
      link = props.artist.artist_social_media.youtube;
    }
    if (event.target.id === "apple_music") {
      link = props.artist.artist_social_media.apple_music;
    }
    window.open(link, "_blank");
  }

  var x;
  let random = Math.floor(Math.random() * 101);
  var artistid = Math.floor(Math.random() * 10);
  const [currentPlayingMusic, setCurrentPlayingMusic] = useState(false);

  const buySlice = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_2
    );

    axios
      .post("/api/charge", {
        email: session.user.email,
        imageUrl: props.artist.artist_image_url,
        artistAlias: props.artist.artist_alias,
      })
      .then(function (result) {
        if (result.data.message) {
          console.log(result.data);
          if (result.data.level > 3) result.data.level = 3;
          console.log(result.data.level);
          props.updateModal(
            result.data.message,
            result.data.level,
            result.data.referral_code
          );
          return result;
        }
        return stripe.redirectToCheckout({ sessionId: result.data.id });
      })
      .then(function (result) {
        // If redirectToCheckout fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using error.message.
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        if (error) console.error("Error:", error);
      });
  };

  function getMusic() {
    if (props.artist.artist_alias === "EBE Kastro")
      return "/assets/ebe_kastro.m4a";
    else return "/assets/chase_paves.m4a";
  }

  function pay() {
    fetch("/api/charge", {
      method: "POST",
    })
      .then(function (response) {
        console.log(response.json());
        return response.json();
      })
      .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function (result) {
        // If redirectToCheckout fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using error.message.
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    // Update the document title using the browser API
    x = document.getElementById("myAudio" + props.artist.artist_alias + random);
  });

  var x = React.createRef();
  function musicController() {
    if (!currentPlayingMusic) {
      playAudio();
      setCurrentPlayingMusic(true);
    } else {
      pauseAudio();
      setCurrentPlayingMusic(false);
    }
  }

  function musicEnded() {
    setCurrentPlayingMusic(false);
    console.log("music ended");
  }

  function playAudio() {
    x.play();
  }

  function pauseAudio() {
    x.pause();
  }
  return (
    <div className="artist-appear">
      <h1 style={{ margin: "5px 0px", width: "300px" }}>
        {props.artist.artist_alias}
      </h1>
      <div className="artist_card_container">
        <div className="artist_card_top">
          <div className="artist_card_image_container">
            <audio
              id={"myAudio" + props.artist.artist_alias + random}
              onEnded={musicEnded}
            >
              <source src={getMusic()} type="audio/mp4" />
              Your browser does not support the audio tag.
            </audio>
            <div className="artist-image-container">
              <img
                src={`${props.artist.artist_image_url}`}
                alt=""
                className={classNames({
                  artist_image: true,
                  rotate_artist: currentPlayingMusic,
                })}
                onClick={musicController}
              />
              <p>Click me</p>
            </div>
          </div>
          <div className="artist_card_bio">
            <p>
              <span className="bio">{props.artist.artist_description}</span>
              <span
                className="read_more"
                onClick={() => {
                  const artist = props.artist;
                  console.log(artist);
                  props.readMore(artist);
                }}
              >
                Read more
              </span>
            </p>

            <div className="artist_social_media">
              <img
                src="/assets/icons/spotify.svg"
                alt=""
                id="spotify"
                onClick={(event) => openLink(event)}
              />
              <img
                src="/assets/icons/instagram.svg"
                alt=""
                id="instagram"
                onClick={(event) => openLink(event)}
              />
              <img
                src="/assets/icons/applemusic.png"
                alt=""
                id="apple_music"
                onClick={(event) => openLink(event)}
              />
              <img
                src="/assets/icons/youtube.svg"
                alt=""
                id="youtube"
                onClick={(event) => openLink(event)}
              />
            </div>
          </div>
        </div>
        <div className="artist_card_bottom">
          <p>{`${props.artist.total_slices - props.artist.purchased_slices}/${
            props.artist.total_slices
          }`}</p>
          <button onClick={buySlice}>Slice $5.00</button>
        </div>
      </div>
    </div>
  );
}
