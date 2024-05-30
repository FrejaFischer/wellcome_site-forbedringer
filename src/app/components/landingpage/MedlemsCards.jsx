import Link from "next/link";
import styles from "./MedlemsCards.module.scss";

export default function MedlemsCards({ text, href, image }) {
  return (
    <Link href={"/"} prefetch={false} className={`${styles.medlems_Link} `}>
      <section className={`${styles.medlems_card} ${styles[image]}`}>
        <div className={styles.overlay}>
          <h3>{text}</h3>
        </div>
      </section>{" "}
    </Link>
  );
}
