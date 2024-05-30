import Link from "next/link";
import styles from "@/app/components/global/LinkBtn.module.scss";

//LinkBtn have five variants:
//primary, secondary, tertiary_dark, tertiary_light and spa

//Hvis komponentet skal have margin-top, så skal der sættes attribut margin=true

export default function LinkBtn({ href, text, variant, margin }) {
  const marginStyling = margin ? "margin" : "";
  return (
    <Link href={href} prefetch={false} className={`${styles.wellcome_btn} ${styles[variant]} ${styles[marginStyling]}`}>
      {text}
    </Link>
  );
}
