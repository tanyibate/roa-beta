import React, { useState } from "react";
import ArtistCard from "../../components/ArtistCard";

export default function index() {
  return (
    <div>
      <div className="artist-container">
        <ArtistCard />
        <ArtistCard />
        <ArtistCard />
      </div>
    </div>
  );
}
