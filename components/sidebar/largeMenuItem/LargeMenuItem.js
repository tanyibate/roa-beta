import React from "react";
import style from "./styles.module.scss";
import { useRouter } from "next/router";

export default function menuItem(props) {
  const router = useRouter();
  function navigate() {
    router.push(props.url);
    props.close();
  }
  return (
    <div className={style.menu_item} onClick={navigate}>
      <img src={props.image} className={style.sidebar_icon} alt={""} />
      <p className={style.title}>{props.name}</p>
    </div>
  );
}
