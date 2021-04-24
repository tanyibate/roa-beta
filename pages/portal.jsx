import styles from "../styles/portal.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Portal() {
  const router = useRouter();
  return (
    <div className={styles.portal_container}>
      <iframe
        src="https://community.tribe.so/embed/home?components=feed&feedLimit=10"
        frameborder="0"
        allowTransparency="true"
        style={{
          minHeight: "300px",
          height: "100%",
          width: "100%",
          padding: "0",
        }}
      ></iframe>
    </div>
  );
}
