import React, { useState } from "react";
import ArtistCard from "../../components/ArtistCard";

export default function index() {
  return (
    <div className="artist-container">
      <ArtistCard />
      <ArtistCard />
      <ArtistCard />
      <img
        src="/assets/info-graphic.png"
        alt=""
        style={{ height: "600px", width: "1000px" }}
      />
    </div>
  );
}
