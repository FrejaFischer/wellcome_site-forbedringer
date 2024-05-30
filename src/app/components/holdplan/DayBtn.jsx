import styles from "./DayBtn.module.scss";

export default function DayBtn({ day, setChosenDayNumber, chosenDayNumber, allClasses, classSelection, checked }) {
  const mobiletext = day.slice(0, 1);
  const dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

  //For at vide om en DayRadio skal være disabled, skal vi vide om der findes hold i allClasses, der foregår på denne dag
  const daySelection = allClasses.length > 0 ? allClasses.filter((item) => item.time.weekday === day).length : 1;
  const isDisabled = daySelection > 0 ? false : true;

  return (
    <section className={styles.container}>
      <button
        className={`${styles.button} ${checked ? styles.chosen : ""}`}
        onClick={() => {
          //Når dagen er valgt skal chosenDayNumber ændres til det valgte. Dog skal vi oversætte dagens navn tilbage til dens tal
          setChosenDayNumber(dayNames.findIndex((item) => item === day));
        }}
        disabled={isDisabled}
      >
        <span className={styles.desk_text}>
          {day} <span className={styles.chosen_day}>Vælg {day}</span>
        </span>
        <span className={styles.mobile_text}>
          {mobiletext}
          <span className={styles.chosen_day}>Vælg {day}</span>
        </span>
      </button>
    </section>
  );
}
