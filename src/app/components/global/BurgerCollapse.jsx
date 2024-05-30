import Link from "next/link";
import styles from "./BurgerCollapse.module.scss";

export default function BurgerCollapse({ navName, subLinks, openSub, setOpenSub, setIsOpen, currentSite }) {
  const handleToggle = () => {
    openSub === navName ? setOpenSub("") : setOpenSub(navName);
  };

  return (
    <li className={styles.list_item}>
      <button className={`${styles.nav_btn} ${openSub === navName && styles.active}`} onClick={() => handleToggle()}>
        {navName}
      </button>

      {subLinks.map((link) => {
        const uniqueId = Math.random();
        return (
          <Link key={uniqueId} href={link.href} className={`${styles.sub_nav_link} ${openSub === navName ? styles.visible : styles.hide} ${currentSite === link.title ? styles.active : ""}`} onClick={() => setIsOpen(false)}>
            {link.title}
          </Link>
        );
      })}
    </li>
  );
}
