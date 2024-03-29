import React, { useState, useEffect } from "react";
import Slice from "../components/slice/Slice";
import styles from "../styles/portfolio.module.scss";
import { getSession, useSession } from "next-auth/client";
import axios from "axios";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";

export default function portfolio({ user }) {
  const [modalActive, setModalActive] = useState(false);
  const [slices, setSlices] = useState([]);
  const [referralCode, setReferralCode] = useState("");
  const [modalText, setModalText] = useState("");
  const [level, setLevel] = useState(1);
  const [loading, SetLoading] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_APP_URL}/register/${referralCode}`
    );
    let clipboard = document.querySelector("#clipboard");
    clipboard.style.display = "flex";
  }

  useEffect(() => {
    SetLoading(true);
    axios.get(`/api/users/slices`).then((result) => {
      SetLoading(false);
      console.log(result.data);
      setSlices(result.data);
    });
  }, []);
  const router = useRouter();
  const getModal = () => {
    axios
      .get("/api/canbuyaslice")
      .then((result) => {
        console.log(result.data[0].slice_count);
        console.log("12344");
        if (result.data[0].slice_count >= 2) {
          setReferralCode(result.data[0].referral_code);
          setModalText(
            "You have bought the maximum number of slices for the beta, thank you for your participation, have a lookout on the Arrivals page for interactions with our artists."
          );
          if (result.data[0].level > 3) result.data[0].level = 3;
          setLevel(result.data[0].level);
          setModalActive(true);
        } else if (result.data[0].level < 3 && result.data[0].slice_count > 0) {
          if (result.data[0].level > 3) result.data[0].level = 3;
          setReferralCode(result.data[0].referral_code);
          let message =
            result.data[0].level > 1
              ? `What's a neighborhood without your friends. Refer ${
                  3 - result.data[0].level
                } friend to buy another slice!`
              : `What's a neighborhood without your friends. Refer ${
                  3 - result.data[0].level
                } friends to buy another slice!`;
          setModalText(message);
          setLevel(result.data[0].level);
          setModalActive(true);
        } else router.push("/artists");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.portfolio_container}>
      <div className={styles.slices_container}>
        <h1>My Slices</h1>
        {loading && (
          <div
            style={{
              padding: "5px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactLoading type="spin" color="#1dd760" height={50} width={50} />
          </div>
        )}
        {slices.length === 0 && !loading && (
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  type="text"
                  value={`${process.env.NEXT_PUBLIC_APP_URL}/register/${referralCode}`}
                  readOnly
                />
                <div className={styles.copy_button} onClick={copyCode}>
                  <img src="/assets/icons/copy.svg" alt="" />
                </div>
              </div>
            </div>
            <div className={styles.copied} id="clipboard">
              Copied to clipboard
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
