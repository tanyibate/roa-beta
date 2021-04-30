import React from "react";
import { useRouter } from "next/router";

export default function HomeIcon() {
  const router = useRouter();
  return (
    <div
      className="home-icon"
      onClick={() => {
        router.push("/");
      }}
    >
      <img src="/assets/icons/home.png" alt="" />
    </div>
  );
}
