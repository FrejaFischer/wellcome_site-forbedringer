"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./MedlemsCards.module.scss";

export default function MedlemsCards({ text, price, image }) {
  const [cardText, setCardText] = useState(text);
  const [isInMiddle, setIsInMiddle] = useState(false); //State (boolean) der viser om elementet er i midten af skærmen (og afgør om en class skal sættes på kortet)
  const targetRef = useRef(null); //useRef, der er connected til medlems_card

  const isElementInMiddle = (element) => {
    const rect = element.getBoundingClientRect(); //viser informationer om elementets placering i viewport
    const viewportHeight = window.innerHeight; //finder højden er indre højde
    const middleStart = viewportHeight / 2 - 250; //finde toppen af det midterstykke, hvor tingene sker
    const middleEnd = viewportHeight / 2 + 250; //finder bunder af det midterstykke, hvor tingene sker

    return rect.top >= middleStart && rect.bottom <= middleEnd; //returnere true eller false, alt efter om den er i midten eller ej
  };

  useEffect(() => {
    const checkIfInMiddle = () => {
      if (targetRef.current) {
        setIsInMiddle(isElementInMiddle(targetRef.current));
      } //hvis targetRef er til stede, så sæt state til true / false
    };
    // Check position on scroll
    window.addEventListener("scroll", () => {
      checkIfInMiddle();
    });
    // Check position on initial load
    checkIfInMiddle();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", checkIfInMiddle);
    };
  }, []);
  return (
    <Link href={"/"} prefetch={false} className={`${styles.medlems_Link} `}>
      <section className={`${styles.medlems_card} ${styles[image]} ${isInMiddle && styles.in_middle}`} ref={targetRef}>
        <div className={styles.overlay}>
          <div className={styles.text_container}>
            <h3 className={styles.header}>
              <span className={styles.text}>{text}</span>
              <span className={styles.more}>Læs mere</span>
            </h3>
            {cardText === text && <p>{price} DKK</p>}
          </div>
        </div>
      </section>{" "}
    </Link>
  );
}
