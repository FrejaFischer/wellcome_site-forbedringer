import styles from "./CategoryCard.module.scss";
import Link from "next/link";

export default function CategoryCard({ href, title, category }) {
  return (
    <Link className={styles.link} href={href} prefetch={false}>
      <section className={`${styles.card} ${styles[category]}`}>
        <div className={styles.overlay}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      </section>
    </Link>
  );
}
