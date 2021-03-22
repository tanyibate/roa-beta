import styles from "./sidebar-styles.module.scss";
import MenuItem from "./menuItem/MenuItem";
import SmallMenuItem from "./smallMenuItem/SmallMenuItem";
import LargeMenuItem from "./largeMenuItem/LargeMenuItem";
import classNames from "classnames";
import { useState } from "react";
export default function SideBar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const closeHamburger = () => {
    setHamburgerOpen(false);
  };
  return (
    <>
      <div className={styles.sidebar}>
        <img src="assets/Logo/ROA_logowhite.png" className={styles.logo} />
        <MenuItem name={"Home"} image={"/assets/icons/home.png"} url={"/"} />
        <MenuItem
          name={"My Slices"}
          image={"/assets/icons/graph.png"}
          url={"/slices"}
        />
        <MenuItem
          name={"Artists"}
          image={"/assets/icons/play-button.svg"}
          url={"/artists"}
        />
        <MenuItem
          name={"Interactions"}
          image={"/assets/icons/megaphone.png"}
          url={"/interactions"}
        />
        <MenuItem name={"FAQ"} image={"/assets/icons/faq.jpeg"} url={"/faq"} />
        <MenuItem
          name={"Settings"}
          image={"/assets/icons/settings.png"}
          url={"/settings"}
        />
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
            name={"My Slices"}
            image={"/assets/icons/graph.png"}
            url={"/slices"}
            close={closeHamburger}
          />
          <LargeMenuItem
            name={"Artists"}
            image={"/assets/icons/play-button.svg"}
            url={"/artists"}
            close={closeHamburger}
          />
          <LargeMenuItem
            name={"Interactions"}
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
        </div>
      )}
    </>
  );
}
