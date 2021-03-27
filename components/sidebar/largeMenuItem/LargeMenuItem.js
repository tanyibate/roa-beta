import React from "react";
import style from "./styles.module.scss";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/actions/index";
import { useSelector } from "react-redux";
import axios from "axios";

export default function menuItem(props) {
  const router = useRouter();
  const refreshToken = useSelector((state) => state.refreshToken);
  const dispatch = useDispatch();
  const navigate = async () => {
    if (props.url === "/login") {
      await axios({
        method: "post",
        url: "/api/logout",
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      })
        .then(() => {
          dispatch(logOut());
          props.close();

          router.push(props.url);
        })
        .catch(() => {
          dispatch(logOut());
          props.close();
          router.push(props.url);
        });
    } else {
      props.close();
      props.close();
      router.push(props.url);
    }
  };
  return (
    <div className={style.menu_item} onClick={navigate}>
      <img src={props.image} className={style.sidebar_icon} alt={""} />
      <p className={style.title}>{props.name}</p>
    </div>
  );
}
