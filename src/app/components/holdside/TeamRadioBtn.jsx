"use client";
import styles from "./TeamRadioBtn.module.scss";

export default function TeamRadioBtn({ title, setChosenTeam, checked, setVisible }) {
  return (
    <>
      <input
        type="radio"
        name="teams"
        id={title}
        //Her sættes både chosenTeam og visible. Begge bruges i TeamView: chosenTeam bruges flere steder til at tjekke om chosenTeam er === item.title (fra databasen). Visible bruges til styling af elementerne, der skal kunne skjules og animeres.
        onChange={() => {
          setChosenTeam(title);
          setVisible(true);
        }}
        className={styles.input}
        checked={checked}
      />
      <label htmlFor={title} className={styles.label}>
        <span>{title}</span>
      </label>
    </>
  );
}
