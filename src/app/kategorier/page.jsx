import styles from "./kategori.module.scss";
import CategoryCard from "../components/kategoriside/CategoryCard";
import HeaderTwo from "../components/global/HeaderTwo";
import LinkBtn from "../components/global/LinkBtn";
import Layout from "../components/global/Layout";
import HeaderOne from "../components/global/HeaderOne";

export default function kategorier() {
  return (
    <Layout current={{ nav: "Fitness", site: "Hold kategorier" }}>
      <main>
        <article>
          <section className={styles.hero_section}>
            <div className={styles.overlay}></div>
            <div className={styles.hero_text}>
              <HeaderOne title="Vores hold kategorier" color="white"></HeaderOne>
              <p className={styles.paragraph}>Vi har et stort udvalg af ugentlige hold med kompetente og erfarne instruktører. Vi sætter en ære i at være innovative og udvikle hold, der er sjove, sikre og effektive.</p>
            </div>
          </section>
          <section className={styles.card_container}>
            {/*FUNKTIONEN BAG KATEGORI-CARD: For at man kan klikke på et kategori-card og dermed få vist hold indenfor den specifikke kategori, sender vi et parameter med i href'en: eksempelvis "Indoor-cycling". Dette parameter bliver så brugt inden på Page for hold*/}
            <div className={styles.flex_cards}>
              <CategoryCard category="indoor_cycling" title="Wellcome indoor cycling" href="kategorier/hold?category=Indoor-cycling"></CategoryCard>
              <CategoryCard category="energy" title="Wellcome energy" href="kategorier/hold?category=Energy"></CategoryCard>
              <CategoryCard category="functional" title="Wellcome functional" href="kategorier/hold?category=Functional"></CategoryCard>
              <CategoryCard category="heat" title="Wellcome heat" href="kategorier/hold?category=Heat"></CategoryCard>
            </div>
            <div className={styles.flex_cards}>
              <CategoryCard category="nordic_strong" title="Wellcome nordic strong" href="kategorier/hold?category=Nordic-strong"></CategoryCard>
              <CategoryCard category="pleasure" title="Wellcome pleasure" href="kategorier/hold?category=Pleasure"></CategoryCard>
              <CategoryCard category="body_mind" title="Wellcome body mind" href="kategorier/hold?category=Body-mind"></CategoryCard>
              <CategoryCard category="reformer" title="Wellcome reformer" href="kategorier/hold?category=Reformer"></CategoryCard>
            </div>
          </section>
        </article>
        <article className={styles.personal_trainer_section}>
          <HeaderTwo type="fitness" title="Er en personlig træner noget for dig?"></HeaderTwo>
          <p className={styles.trainer_paragraph}>
            I Wellcome kan du træne med en af vores dygtige personlige trænere - også uden du er medlem i centeret. Ved check-in til hver træning modtager du en vand og et håndklæde. Læs om alle vores personlige trænere eller book en tid her.
          </p>
          <LinkBtn margin={true} variant="secondary" href="*" text="Se trænere"></LinkBtn>
        </article>
      </main>
    </Layout>
  );
}
