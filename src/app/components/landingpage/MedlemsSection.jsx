import styles from "./MedlemsSection.module.scss";
import MedlemsCards from "./MedlemsCards";

export default function MedlemsSection() {
  return (
    <article className={styles.full_section}>
      <h2>Vores medlemskaber</h2>

      <section className={styles.medlemscards_section}>
        <MedlemsCards text="Fitness Medlem" image="medlems_image1" price="895"></MedlemsCards>
        <MedlemsCards text="Club Medlem" image="medlems_image2" price="1795"></MedlemsCards>
        <MedlemsCards text="Young Medlem" image="medlems_image3" price="595"></MedlemsCards>
      </section>
    </article>
  );
}
