import React from "react";

export default function ArtistCard(props) {
  return (
    <div className="artist_card_container">
      <div className="artist_card_top">
        <div className="artist_card_image_container">
          <img
            src="https://yt3.ggpht.com/ytc/AAUvwniFM4h3iOlRCk5VDjbKkWjNRuDntpo3pNm8-TpLXg=s900-c-k-c0x00ffffff-no-rj"
            alt=""
            className="artist_image"
          />
          <div className="artist_social_media">
            <img src="/assets/icons/spotify.svg" alt="" />
            <img src="/assets/icons/instagram.svg" alt="" />
            <img src="/assets/icons/applemusic.png" alt="" />
            <img src="/assets/icons/youtube.svg" alt="" />
          </div>
        </div>
        <div className="artist_card_bio">
          <h1>EBE Kastro</h1>
          <p>
            Up and coming Music artist Ebe Kastro is ready to change the hip hop
            industry! Formerly from Newport News, Virginia Ebe Kastro has
            hustled hard and focused his sights on success. Spittin 'truth on
            his latest single “UP” which is currently on all platforms has
            caught everyone's attention!
          </p>
        </div>
      </div>
      <div className="artist_card_bottom">
        <p>278/300 Remaining Slices</p>
        <button>Buy 5$</button>
      </div>
    </div>
  );
}
