import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { loadStripe } from "@stripe/stripe-js";

export default function ArtistCard(props) {
  var x;
  var artistid = Math.floor(Math.random() * 10);
  const [currentPlayingMusic, setCurrentPlayingMusic] = useState(false);

  const buySlice = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_2
    );

    fetch("/api/charge", {
      method: "POST",
    })
      .then(function (response) {
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
  };

  function pay() {
    fetch("/api/charge", {
      method: "POST",
    })
      .then(function (response) {
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
    x = document.getElementById("myAudio");
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

  function playAudio() {
    x.play();
  }

  function pauseAudio() {
    x.pause();
  }
  return (
    <div className="artist-appear">
      <h1 style={{ margin: "5px 0px", width: "300px" }}>EBE Kastro</h1>
      <div className="artist_card_container">
        <div className="artist_card_top">
          <div className="artist_card_image_container">
            <audio id={"myAudio"} onEnded={() => setCurrentPlayingMusic(false)}>
              <source src="/assets/drake.mp3" type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
            <div>
              <img
                src="https://yt3.ggpht.com/ytc/AAUvwniFM4h3iOlRCk5VDjbKkWjNRuDntpo3pNm8-TpLXg=s900-c-k-c0x00ffffff-no-rj"
                alt=""
                className={classNames({
                  artist_image: true,
                  rotate_artist: currentPlayingMusic,
                })}
                onClick={musicController}
              />
            </div>
          </div>
          <div className="artist_card_bio">
            <p>
              Up and coming Music artist Ebe Kastro is ready to change the hip
              hop industry! Formerly from Newport News, Virginia Ebe Kastro has
              hustled hard and focused his sights on success. Spittin 'truth on
              his latest single “UP” which is currently on all platforms has
              caught everyone's attention!
            </p>
            <div className="artist_social_media">
              <img src="/assets/icons/spotify.svg" alt="" />
              <img src="/assets/icons/instagram.svg" alt="" />
              <img src="/assets/icons/applemusic.png" alt="" />
              <img src="/assets/icons/youtube.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="artist_card_bottom">
          <p>278/300</p>
          <button onClick={buySlice}>Slice $5.00</button>
        </div>
      </div>
    </div>
  );
}
