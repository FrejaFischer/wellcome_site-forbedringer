import styles from "./DayRadio.module.scss";

export default function DayRadio({ day, setChosenDayNumber, chosenDayNumber, allClasses, classSelection, checked }) {
  //Her findes det første bogstav i dagen til brug på mobilen
  const mobiletext = day.slice(0, 1);

  //For at vide om en DayRadio skal være disabled, skal vi vide om der findes hold i allClasses, der foregår på denne dag
  const daySelection = allClasses.length > 0 ? allClasses.filter((item) => item.time.weekday === day).length : 1;
  const isDisabled = daySelection > 0 ? false : true;

  //Da chosenDayNumber viser hvilken dag der er valgt i form af et tal (søndag=0 - lørdag=6) skal vi oversætte dette til dagens navn, hvilket vi gør ved at have dayNames i et array i denne rækkefølge
  const dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

  return (
    <section className={styles.container}>
      <input
        type="radio"
        name="weekdays"
        id={day}
        value={day}
        onChange={() => {
          //Når dagen er valgt skal chosenDayNumber ændres til det valgte. Dog skal vi oversætte dagens navn tilbage til dens tal
          setChosenDayNumber(dayNames.findIndex((item) => item === day));
        }}
        className={`${styles.input} ${checked ? styles.checked : ""}`}
        defaultChecked={checked}
        disabled={isDisabled}
      />
      <label htmlFor={day} className={styles.label}>
        <span className={styles.desk_text}>{day}</span>
        <span className={styles.mobile_text}>{mobiletext}</span>
      </label>
    </section>
  );
}
