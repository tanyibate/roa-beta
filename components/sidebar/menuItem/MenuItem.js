import React from "react";
import style from "./styles.module.scss";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/actions/index";

export default function menuItem(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const navigate = () => {
    if (props.url === "/login") dispatch(logOut());
    router.push(props.url);
  };

  return (
    <div className={style.menu_item} onClick={navigate}>
      <img src={props.image} className={style.sidebar_icon} alt={""} />
      <p className={style.title}>{props.name}</p>
    </div>
  );
}
