import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/client";
import MetaTags from "react-meta-tags";

export default function Home() {
  const [session, loading] = useSession();

  const router = useRouter();
  return (
    <div className={styles.home_container}>
      <MetaTags>
        <title>ROA</title>
        <meta
          name="description"
          content="A first of its kind marketplace for exclusive fan clubs"
        />
        <meta property="og:title" content="Rogue on Arrival" />
        <meta property="og:image" content={require("/assets/preview.png")} />
      </MetaTags>
      {!session && (
        <div className={styles.login_button_container}>
          <p>Already have an account? </p>
          <button
            onClick={() => {
              router.push("/login");
            }}
          >
            Log in
          </button>
        </div>
      )}
      <div className={styles.infographic_container}>
        <div className={styles.block}>
          <h2>A first of its kind marketplace for exclusive fan clubs</h2>
          <h3>Slices</h3>
          <h3>These are the key to an artist’s neighborhood</h3>
        </div>
        <div className={styles.block}>
          <h3>Fan Club</h3>
          <h3>Exclusive access to your favorite artists</h3>
          <h3>Marketplace</h3>
          <h3>
            Slices may be bought and sold on our bid/ask marketplace (Coming
            soon)
          </h3>
        </div>
        <div className={styles.block}>
          <Image
            height={300}
            width={300}
            src="/assets/ROA_Mobilemockup_low.jpg"
            alt=""
          />
        </div>
      </div>
      {!session && (
        <div className={styles.button_container}>
          <img src="/assets/icons/down-arrow.svg" alt="" />
          <button
            onClick={() => {
              router.push("/register");
            }}
          >
            Sign Up Now
          </button>
        </div>
      )}
    </div>
  );
}
