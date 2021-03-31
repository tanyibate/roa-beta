import styles from "./sidebar-styles.module.scss";
import MenuItem from "./menuItem/MenuItem";
import SmallMenuItem from "./smallMenuItem/SmallMenuItem";
import LargeMenuItem from "./largeMenuItem/LargeMenuItem";
import classNames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function SideBar() {
  const loggedIn = useSelector((state) => state.loggedIn);

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const closeHamburger = () => {
    setHamburgerOpen(false);
  };
  return (
    <>
      <div className={styles.sidebar}>
        <img src="assets/Logo/ROA_logowhite.png" className={styles.logo} />
        <MenuItem name={"Home"} image={"/assets/icons/home.png"} url={"/"} />
        {loggedIn && (
          <MenuItem
            name={"Portfolio"}
            image={"/assets/icons/graph.png"}
            url={"/portfolio"}
          />
        )}
        {loggedIn && (
          <MenuItem
            name={"Artists"}
            image={"/assets/icons/play-button.svg"}
            url={"/artists"}
          />
        )}
        {loggedIn && (
          <MenuItem
            name={"Arrivals"}
            image={"/assets/icons/megaphone.png"}
            url={"/interactions"}
          />
        )}
        {loggedIn && (
          <MenuItem
            name={"FAQ"}
            image={"/assets/icons/faq.jpeg"}
            url={"/faq"}
          />
        )}
        {loggedIn && (
          <MenuItem
            name={"Settings"}
            image={"/assets/icons/settings.png"}
            url={"/settings"}
          />
        )}
        {loggedIn && (
          <MenuItem
            name={"Log Out"}
            image={"/assets/icons/logout.png"}
            url={"/login"}
          />
        )}
      </div>
      <div className={styles.bottom_navigation}>
        <img src="./assets/Logo/ROA_FULLlogowhite.png" alt="" />

        <div
          className={classNames({
            "menu-btn": true,
            open: hamburgerOpen,
          })}
          onClick={() => {
            setHamburgerOpen(!hamburgerOpen);
          }}
        >
          <div className="menu-btn__burger"></div>
        </div>
      </div>
      {hamburgerOpen && (
        <div className={styles.burger_menu}>
          <LargeMenuItem
            name={"Home"}
            image={"/assets/icons/home.png"}
            url={"/"}
            close={closeHamburger}
          />
          <LargeMenuItem
            name={"Portfolio"}
            image={"/assets/icons/graph.png"}
            url={"/portfolio"}
            close={closeHamburger}
          />
          <LargeMenuItem
            name={"Artists"}
            image={"/assets/icons/play-button.svg"}
            url={"/artists"}
            close={closeHamburger}
          />
          <LargeMenuItem
            name={"Arrivals"}
            image={"/assets/icons/megaphone.png"}
            url={"/interactions"}
            close={closeHamburger}
          />
          <LargeMenuItem
            name={"FAQ"}
            image={"/assets/icons/faq.jpeg"}
            url={"/faq"}
            close={closeHamburger}
          />
          <LargeMenuItem
            name={"Settings"}
            image={"/assets/icons/settings.png"}
            url={"/settings"}
            close={closeHamburger}
          />
          <LargeMenuItem
            name={"Log Out"}
            image={"/assets/icons/logout.png"}
            url={"/login"}
            close={closeHamburger}
          />
        </div>
      )}
    </>
  );
}
