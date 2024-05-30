import Link from "next/link";
import styles from "./HeaderLinksContainer.module.scss";

export default function HeaderLinksContainer({ title, submenu, openSub, setOpenSub, current }) {
  const currentSite = current.site; //const der viser hvilken side man er inde på lige nu

  const handleToggle = () => {
    openSub === title ? setOpenSub("") : setOpenSub(title); //Dette er togglefunktionen, der sørger for, at submenuerne bliver vist. Ved sidens rendering, vil openSub være lig med en tom string. Når der så klikkes på et menupunkt, vil openSub blive sat til det menupunkt (title), der er klikket på. Hvis man så klikker på menupunktet igen, vil den blive sat til en tom string igen.
  };
  return (
    <>
      <button className={`${styles.button} ${openSub === title ? styles.underline : ""}`} onClick={handleToggle}>
        {title}
      </button>
      <div className={styles.container}>
        {submenu.map((item, index) => (
          <Link
            href={item.href}
            className={`${styles.a} ${openSub === title ? styles.show : ""} 
          ${currentSite === item.subtitle ? styles.active : ""}`}
            key={index}>
            {item.subtitle}
          </Link>
        ))}
      </div>
    </>
  );
}
