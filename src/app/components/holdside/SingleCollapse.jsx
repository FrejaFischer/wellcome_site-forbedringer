import { useState } from "react";
import styles from "./SingleCollapse.module.scss";
import LinkBtn from "../global/LinkBtn";

export default function SingleCollapse({ title, text, category }) {
  const [isOpen, setIsOpen] = useState(false); //State der holder styr på om collapsen er åben eller lukket

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen); //Togglefunktion, som sørger for at ændre (og sætte setIsOpen) boolean fra false til true (og omvendt) ved klik på button
  };
  return (
    <div className={styles.single_container}>
      <button className={`${styles.title_button}  ${isOpen ? styles.underline : ""}`} onClick={handleToggle}>
        {title}
      </button>
      <h2 className={styles.heading}>{title}</h2>
      <div className={`${styles.container} ${isOpen ? styles.visible : styles.hide}`}>
        <p className={styles.paragraph}>{text}</p>
        <LinkBtn variant="secondary" text="Se holdplan" href={`/holdplan?kategori=${category}&hold=${title.replace("&", "og")}`} margin={true}></LinkBtn>
        {/* (alle hold der indeholder "&" bliver sendt afsted i href med et "og" i stedet, da den bliver forvirret over & tegnet ellers) */}
      </div>
    </div>
  );
}

// kategorier/hold?category=Functional
