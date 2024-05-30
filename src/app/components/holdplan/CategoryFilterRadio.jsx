import styles from "./CategoryFilterRadio.module.scss";

//skal have et unikt id, et label og samme name som de radioBtn den er i gruppe med
//Hvis det skal være checked fra start af (det skal "alle kategorier"), så skal den have checked=true
export default function CategoryFilterRadio({ id, name, label, color, setChosenCategory, checked, setChosenClass }) {
  return (
    <div className={styles.radio_button}>
      <input
        type="radio"
        name={name}
        id={id}
        className={styles.input}
        onChange={() => {
          setChosenCategory(id);
          setChosenClass("all-class");
        }}
        defaultChecked={checked}
      />
      <label htmlFor={id} className={`${styles.label} ${styles[color]}`}>
        {label}
      </label>
    </div>
  );
}
