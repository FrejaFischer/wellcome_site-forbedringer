import Link from "next/link";
import styles from "./FooterLink.module.scss";

export default function FooterLink({ text, href }) {
  return (
    <Link href={href} prefetch={false} className={`${styles.footer_link} `}>
      {text}
    </Link>
  );
}
