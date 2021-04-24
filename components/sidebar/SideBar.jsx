import styles from "./sidebar-styles.module.scss";
import MenuItem from "./menuItem/MenuItem";
import SmallMenuItem from "./smallMenuItem/SmallMenuItem";
import LargeMenuItem from "./largeMenuItem/LargeMenuItem";
import classNames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/client";

export default function SideBar() {
  const loggedIn = useSelector((state) => state.loggedIn);
  const [session, loading] = useSession();

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const closeHamburger = () => {
    setHamburgerOpen(false);
  };
  return (
    <>
      <div className={styles.sidebar}>
        <img src="/assets/Logo/ROA_logowhite.png" className={styles.logo} />
        <MenuItem name={"Home"} image={"/assets/icons/home.png"} url={"/"} />
        {session && (
          <MenuItem
            name={"Neighbourhood"}
            image={"/assets/icons/communities.svg"}
            url={"/portal"}
          />
        )}
        {session && (
          <MenuItem
            name={"My Slices"}
            image={"/assets/icons/graph.png"}
            url={"/portfolio"}
          />
        )}
        {session && (
          <MenuItem
            name={"Artists"}
            image={"/assets/icons/play-button.svg"}
            url={"/artists"}
          />
        )}
        {session && (
          <MenuItem
            name={"Arrivals"}
            image={"/assets/icons/megaphone.png"}
            url={"/interactions"}
          />
        )}

        <MenuItem name={"FAQ"} image={"/assets/icons/faq.jpeg"} url={"/faq"} />

        {session && (
          <MenuItem
            name={"Settings"}
            image={"/assets/icons/settings.png"}
            url={"/settings"}
          />
        )}
        {!session && (
          <MenuItem
            name={"Log In"}
            image={"/assets/icons/logout.png"}
            url={"/login"}
          />
        )}
        {
          <MenuItem
            name={"Contact"}
            image={"/assets/icons/contact.png"}
            url={"/contact"}
          />
        }
        {!session && (
          <MenuItem
            name={"Register"}
            image={"/assets/icons/logout.png"}
            url={"/register"}
          />
        )}
        {session && (
          <MenuItem
            name={"Log Out"}
            image={"/assets/icons/logout.png"}
            url={"/login"}
          />
        )}
      </div>
      <div className={styles.bottom_navigation}>
        <img src="/assets/Logo/ROA_FULLlogowhite.png" alt="" />

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
          {session && (
            <LargeMenuItem
              name={"Neighbourhood"}
              image={"/assets/icons/communities.svg"}
              url={"/portal"}
              close={closeHamburger}
            />
          )}
          {session && (
            <LargeMenuItem
              name={"My Slices"}
              image={"/assets/icons/graph.png"}
              url={"/portfolio"}
              close={closeHamburger}
            />
          )}
          {session && (
            <LargeMenuItem
              name={"Artists"}
              image={"/assets/icons/play-button.svg"}
              url={"/artists"}
              close={closeHamburger}
            />
          )}
          {session && (
            <LargeMenuItem
              name={"Arrivals"}
              image={"/assets/icons/megaphone.png"}
              url={"/interactions"}
              close={closeHamburger}
            />
          )}
          {
            <LargeMenuItem
              name={"FAQ"}
              image={"/assets/icons/faq.jpeg"}
              url={"/faq"}
              close={closeHamburger}
            />
          }
          {session && (
            <LargeMenuItem
              name={"Settings"}
              image={"/assets/icons/settings.png"}
              url={"/settings"}
              close={closeHamburger}
            />
          )}
          {session && (
            <LargeMenuItem
              name={"Log Out"}
              image={"/assets/icons/logout.png"}
              url={"/login"}
              close={closeHamburger}
            />
          )}
          {!session && (
            <LargeMenuItem
              name={"Log In"}
              image={"/assets/icons/logout.png"}
              url={"/login"}
              close={closeHamburger}
            />
          )}
          <LargeMenuItem
            name={"Contact"}
            image={"/assets/icons/contact.png"}
            url={"/contact"}
            close={closeHamburger}
          />
          {!session && (
            <LargeMenuItem
              name={"Register"}
              image={"/assets/icons/logout.png"}
              url={"/register"}
              close={closeHamburger}
            />
          )}
        </div>
      )}
    </>
  );
}
