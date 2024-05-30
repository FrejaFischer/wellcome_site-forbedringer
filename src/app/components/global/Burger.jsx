"use client";
import { useState } from "react";
import BurgerCollapse from "./BurgerCollapse";
import styles from "./Burger.module.scss";
import LinkBtn from "./LinkBtn";
export default function Burger({ current }) {
  const [isOpen, setIsOpen] = useState(false); //state der viser om burger menuen er åben
  const [openSub, setOpenSub] = useState(current.nav); //state der viser hvilken undermenu, der er åben

  const currentSite = current.site; //const der viser hvilken side man er inde på lige nu

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen); //Togglefunktion, som sørger for at sætte false til true (og omvendt) ved klik på button
  };

  return (
    <nav className={styles.burger_nav}>
      <button className={styles.burger_btn} onClick={() => handleToggle()}>
        <span className={`${styles.burger} ${isOpen && styles.is_active}`}>
          <span className={styles.bar}>Åben menu</span>
        </span>
      </button>
      <ul className={`${styles.burger_menu} ${isOpen ? styles.appear : styles.disappear}`}>
        <BurgerCollapse
          navName="Fitness"
          subLinks={[
            { title: "Hold kategorier", href: "/kategorier" },
            { title: "Holdplan", href: "/holdplan" },
            { title: "Personlig Træning", href: "/" },
            { title: "Kost & Ernæring", href: "/" },
            { title: "Osteopati", href: "/" },
          ]}
          openSub={openSub}
          setOpenSub={setOpenSub}
          setIsOpen={setIsOpen}
          currentSite={currentSite}
        />
        <BurgerCollapse
          navName="Spa"
          subLinks={[
            { title: "Om Spaen", href: "/" },
            { title: "Behandlinger", href: "/" },
          ]}
          openSub={openSub}
          setOpenSub={setOpenSub}
          setIsOpen={setIsOpen}
          currentSite={currentSite}
        />
        <BurgerCollapse
          navName="Medlemskaber"
          subLinks={[
            { title: "Se medlemskaber", href: "/" },
            { title: "Firmaaftaler", href: "/" },
          ]}
          openSub={openSub}
          setOpenSub={setOpenSub}
          setIsOpen={setIsOpen}
          currentSite={currentSite}
        />
        <BurgerCollapse
          navName="Om Wellcome"
          subLinks={[
            { title: "Kontakt", href: "/" },
            { title: "Medarbejdere", href: "/" },
            { title: "Events & Nyheder", href: "/" },
            { title: "Om Wellcome", href: "/" },
          ]}
          openSub={openSub}
          setOpenSub={setOpenSub}
          setIsOpen={setIsOpen}
          currentSite={currentSite}
        />
        <li>
          <LinkBtn href="/holdplan" text="Bliv Medlem" variant="primary" />
        </li>
      </ul>
    </nav>
  );
}
