import React, { useState, useEffect } from "react";
import Slice from "../components/slice/Slice";
import styles from "../styles/portfolio.module.scss";
import { getSession, useSession } from "next-auth/client";
import axios from "axios";
import { useRouter } from "next/router";

export default function portfolio({ user }) {
  const [modalActive, setModalActive] = useState(false);
  const [slices, setSlices] = useState([]);
  const [referralCode, setReferralCode] = useState("");
  const [modalText, setModalText] = useState("");
  const [level, setLevel] = useState(1);

  useEffect(() => {
    axios.get(`/api/users/slices`).then((result) => {
      console.log(result.data);
      setSlices(result.data);
    });
  }, []);
  const router = useRouter();
  const getModal = () => {
    axios
      .get("/api/canbuyaslice")
      .then((result) => {
        if (result.data[0].slice_count < result.data[0].level)
          router.push("/artists");
        else if (result.data[0].slice_count >= 3) {
          setReferralCode(result.data[0].referral_code);
          setModalText(
            "You have bought the maximum number of slices for the beta, thank you for your participation, have a lookout on the Arrivals page for interactions with our artists."
          );
          if (result.data[0].level > 3) result.data[0].level = 3;
          setLevel(result.data[0].level);
          setModalActive(true);
        } else {
          setReferralCode(result.data[0].referral_code);
          setModalText(
            "Refer a friend to buy more slices! You're help will be very appreciated."
          );
          if (result.data[0].level > 3) result.data[0].level = 3;
          setLevel(result.data[0].level);
          setModalActive(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.portfolio_container}>
      <div className={styles.slices_container}>
        <h1>My Slices</h1>
        {slices.length === 0 && (
          <p>Head to the artists page to buy some slices!</p>
        )}
        {slices.map((el, index) => {
          return <Slice artist={el} key={"slice" + index} />;
        })}
        <button onClick={getModal}>Buy Another</button>
        {modalActive && (
          <div className={styles.modal}>
            <button onClick={() => setModalActive(false)}>
              Back to My Slices
            </button>
            <h2>{modalText}</h2>

            <div className={styles.progress}>
              <h1>{`Tier ${level}`}</h1>
              <progress id="file" value={`${(level / 3) * 100}`} max="100">
                {" "}
                {`${(level / 3) * 100}`}{" "}
              </progress>
              <h3>Referral Link</h3>
              <input
                type="text"
                value={`${process.env.NEXT_PUBLIC_APP_URL}/register/${referralCode}`}
                readOnly
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      user: session.user.email,
    },
  };
}
