import TeamView from "@/app/components/holdside/TeamView";
import TeamCollapse from "@/app/components/holdside/TeamCollapse";
import Image from "next/image";
import motivationLift from "@/app/img/kategorier/hold/motivation_lift.jpg";
import styles from "./hold.module.scss";
import HeaderTwo from "@/app/components/global/HeaderTwo";
import LinkBtn from "@/app/components/global/LinkBtn";
import Link from "next/link";
import Layout from "@/app/components/global/Layout";

export default function Hold({ searchParams }) {
  console.log("Dette er hvad searchParams er", searchParams.category);
  return (
    <Layout current={{ nav: "", site: "" }}>
      <main>
        <section className={`${styles.hero_section} ${styles[searchParams.category]}`}>
          <div className={styles.overlay}></div>
          <div className={styles.hero_text}>
            <h1 className={styles.title}>Wellcome {searchParams.category}</h1>
            <Link className={styles.link} href="/kategorier/">
              Tilbage til hold kategorier
            </Link>
          </div>
        </section>
        {/* TeamCollapse vises i mobile */}
        <TeamCollapse searchParams={searchParams}></TeamCollapse>
        {/* TeamView vises i desktop */}
        <TeamView searchParams={searchParams}></TeamView>
        <article className={styles.personal_trainer_section}>
          <HeaderTwo type="fitness" title="Er en personlig træner noget for dig?" white={true}></HeaderTwo>
          <p className={styles.trainer_paragraph}>
            I Wellcome kan du træne med en af vores dygtige personlige trænere - også uden du er medlem i centeret. Ved check-in til hver træning modtager du en vand og et håndklæde. Læs om alle vores personlige trænere eller book en tid her.
          </p>
          <LinkBtn margin={true} variant="primary" href="*" text="Se trænere"></LinkBtn>
        </article>
        <section className={styles.motivation_section}>
          <div className={styles.quote_section}>
            <p className={styles.quote}>
              <span className={styles.bold_span}>Motivation</span> is what gets you <br /> started. <span className={styles.bold_span}>Habit</span> is what
              <br /> <span className={styles.italic_span}>keeps you going.</span>
            </p>
          </div>
          <Image className={styles.motivation_img} src={motivationLift} alt=""></Image>
        </section>
      </main>
    </Layout>
  );
}
