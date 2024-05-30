import styles from "./ClassFilterRadio.module.scss";

//skal have et unikt id, et label og samme name som de radioBtn den er i gruppe med
//Hvis det skal være checked fra start af (det skal "alle kategorier"), så skal den have checked=true
export default function ClassFilterRadio({ id, name, label, color, setChosenClass, checked }) {
  return (
    <div className={styles.radio_button}>
      <input
        type="radio"
        name={name}
        id={id}
        className={styles.input}
        onChange={() => {
          setChosenClass(id);
        }}
        defaultChecked={checked}
      />
      <label htmlFor={id} className={`${styles.label} ${styles[color]}`}>
        {label}
      </label>
    </div>
  );
}
