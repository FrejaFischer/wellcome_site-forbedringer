import styles from "./HeaderOne.module.scss";

//Attributen color kan sættes til farven "black" eller "white". Og man kan ændre titlen med attributen "title".
export default function HeaderOne({ title, color }) {
  return <h1 className={`${styles[color]}`}>{title}</h1>;
}
