import React, { useState, useEffect } from "react";
import ArtistCard from "../../components/ArtistCard";

export default function index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update the document title using the browser API
    setTimeout(function () {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="artist-container">
      {loading && (
        <img
          src="/assets/Logo/ROA_logowhite.png"
          alt=""
          style={{ height: "100px", width: "100px" }}
          className="rotate-logo"
        />
      )}
      {!loading && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <ArtistCard />
          <ArtistCard />
          <ArtistCard />
        </div>
      )}
    </div>
  );
}
