"use client";
import LinkBtn from "./LinkBtn";
import Image from "next/image";
import Logo from "@/app/img/global/logo.svg";
import styles from "./Header.module.scss";
import HeaderLinksContainer from "./HeaderLinksContainer";
import { useState, useEffect } from "react";
import Link from "next/link";
import Burger from "./Burger";

export default function Header({ current }) {
  const [openSub, setOpenSub] = useState(""); //State der holder styr på, hvilket menupunkt der er klikket på
  const [isScrolled, setIsScrolled] = useState(false); //State der holder styr på, om der er scrolled på siden
  const alwaysDark = current.site === "Holdplan" || current.site === "Tilmeldt"; //Boolean der siger om headers baggrund altid skal være mørk

  //Hjælp fra ChatGPT: The handleScroll function checks the current vertical scroll position using window.scrollY.
  //   If window.scrollY is greater than 0, it means the user has scrolled down, so setIsScrolled(true) is called.
  //   If window.scrollY is 0 (or less), it means the user is at the very top of the page, so setIsScrolled(false) is called.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    // Add scroll event listener, når componentet bevæger sig ned
    window.addEventListener("scroll", handleScroll);
    // Cleanup function, der fjerner eventlistener når componentet bevæger sig retur
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled || alwaysDark ? styles.scrolled : ""} ${openSub ? styles.scrolled : ""}`}>
      <Link className={styles.link_img} href="/">
        <Image src={Logo} alt="Link: Link til forsiden" width="auto" height="30"></Image>
      </Link>
      <Burger current={current}></Burger>
      <div>
        <nav>
          <ul>
            <li>
              <HeaderLinksContainer
                openSub={openSub}
                setOpenSub={setOpenSub}
                title="Fitness"
                submenu={[
                  { subtitle: "Hold kategorier", href: "/kategorier" },
                  { subtitle: "Holdplan", href: "/holdplan" },
                  { subtitle: "Personlig træning", href: "/" },
                  { subtitle: "Kost & ernæring", href: "/" },
                  { subtitle: "Osteopati", href: "/" },
                ]}
                current={current}
              ></HeaderLinksContainer>
            </li>
            <li>
              <HeaderLinksContainer
                openSub={openSub}
                setOpenSub={setOpenSub}
                title="Spa"
                submenu={[
                  { subtitle: "Om spaen", href: "/" },
                  { subtitle: "Behandlinger", href: "/" },
                ]}
                current={current}
              ></HeaderLinksContainer>
            </li>
            <li>
              <HeaderLinksContainer
                openSub={openSub}
                setOpenSub={setOpenSub}
                title="Medlemskaber"
                submenu={[
                  { subtitle: "Se medlemskaber", href: "/" },
                  { subtitle: "Firmaaftaler", href: "/" },
                ]}
                current={current}
              ></HeaderLinksContainer>
            </li>
            <li>
              <HeaderLinksContainer
                openSub={openSub}
                setOpenSub={setOpenSub}
                title="Om wellcome"
                submenu={[
                  { subtitle: "Kontakt", href: "/" },
                  { subtitle: "Medarbejdere", href: "/" },
                  { subtitle: "Events & nyheder", href: "/" },
                  { subtitle: "Om wellcome", href: "/" },
                ]}
                current={current}
              ></HeaderLinksContainer>
            </li>
          </ul>
        </nav>
        <LinkBtn variant="primary" href="/" text="Bliv medlem"></LinkBtn>
      </div>
    </header>
  );
}
