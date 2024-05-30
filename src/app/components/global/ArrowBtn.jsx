import styles from "./ArrowBtn.module.scss";

export default function ArrowBtn({ direction, onClick }) {
  return (
    <button className={`${styles.arrow} ${styles[direction]}`} onClick={onClick}>
      arrow {direction}
    </button>
  );
}
