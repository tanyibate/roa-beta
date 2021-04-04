import React from "react";
import style from "./styles.module.scss";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/actions/index";
import { useSelector } from "react-redux";
import axios from "axios";
import { getSession, useSession, signOut } from "next-auth/client";

export default function menuItem(props) {
  const [session] = useSession();

  const router = useRouter();
  const refreshToken = useSelector((state) => state.refreshToken);
  const loggedIn = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();

  const navigate = async () => {
    if (props.url === "/login" && session) {
      signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login` });
    } else {
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
