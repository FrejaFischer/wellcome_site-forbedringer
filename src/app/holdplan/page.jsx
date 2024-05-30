"use client";
import { useState, useEffect } from "react";
import styles from "./holdplan.module.scss";
import LinkBtn from "../components/global/LinkBtn";
import DayBtn from "../components/holdplan/DayBtn";
import ClassItem from "../components/holdplan/ClassItem";
import ArrowBtn from "../components/global/ArrowBtn";
import FilteringSection from "../components/holdplan/FilteringSection";
import HeaderOne from "../components/global/HeaderOne";
import Layout from "../components/global/Layout";

export default function Holdplan({ searchParams }) {
  // Hvis der er sendt noget med i searchParams sætter filtrerings states herefter
  const [chosenCategory, setChosenCategory] = useState(searchParams.kategori === undefined ? "all-categories" : searchParams.kategori); //State til at vide hvilken kategori, der filtreres efter.
  const [chosenClass, setChosenClass] = useState(searchParams.kategori === undefined ? "all-class" : searchParams.hold.replace(" og ", " & ")); //State til at vide hvilket hold, der filtreres efter (alle hold der indeholder "&" bliver sendt med et "og" og skal derfor oversættes her)
  const [chosenClassItem, setChosenClassItem] = useState(""); //State til at vide hvilket hold, der er valgt i kalenderen
  const [weekNumber, setWeekNumber] = useState(24); //State til at vide hvilken uge der vises
  const [chosenDayNumber, setChosenDayNumber] = useState(new Date().getDay()); //State til at vide hvilken dag er valgt. Er ved 1st rendering nr. på dagen i dag.
  const [allClasses, setAllClasses] = useState([]); //State der skal indeholde alle hold, der passer til kategori filtrering
  const [classSelection, setClassSelection] = useState([]); //State der kun skal indeholde den valgte dags hold. Dette er det data, der bliver vist på siden

  //For at få filtreret vores data til kun at have en bestemt dags hold, skal vi oversætte chosenDayNumber.
  //Den viser nemlig kun dagen i et tal, hvor søndag=0 og lørdag=6, derfor har vi her et array med alle dagene i samme rækkefølge
  const dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
  let today = dayNames[chosenDayNumber]; //today sætter vi her til at være den oversatte valgte dag

  //useEffect kører ved første rendering, samt hver gang chosenCategory, chosenDayNumber eller chosenClass bliver ændret
  useEffect(() => {
    async function showClasses() {
      //Hvis chosenCategory er sat til en kategori, skal der kun fetches hold indenfor kategorien
      const filteringParameters = chosenCategory !== "all-categories" ? `?category=eq.${chosenCategory}` : "";

      let headersList = {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhvdmx1ZGNwcXVkcXZjcXRlYmxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMzI4MzEsImV4cCI6MjAyOTYwODgzMX0.5K-wz_oerFZ5hmvUq0IOPgJHn0e1sRYh57y_8pFqnKk",
        Prefer: "return=representation",
      };

      let response = await fetch(`https://hovludcpqudqvcqteblj.supabase.co/rest/v1/Hold${filteringParameters}`, {
        method: "GET",
        headers: headersList,
      });

      let data = await response.json();

      setAllClasses([]); //Her rydder vi allClasses, så den er tom og klar til det nye data
      setClassSelection([]); //Her rydder vi classSelection, så den er tom og klar til det nye data

      //Her map'er vi over vores data, og ved hvert hold (item) map'er vi igen i deres "time" data (det array med objekter for hvert tidspunkt holdet afholdes)
      //Vi opdaterer allClasses + classSelection states til at indeholde en ny version af vores fetchede data. Her putter vi holdene ind for hver gang de skal optræde på planen
      data.map((item) => {
        item.time.map((obj) => {
          const uniqueId = Math.random();
          setAllClasses((allClasses) => [...allClasses, { id: uniqueId, title: item.title, trainer: item.trainer, location: item.location, time: obj }]);
          setClassSelection((allClasses) => [...allClasses, { id: uniqueId, title: item.title, trainer: item.trainer, location: item.location, time: obj }]);
        });
      });

      //Herunder tager vi vores nye data i allClasses + classSelection og sorterer det i deres "time.start" tidspunkt.
      //Derved får vi dem rykket rundt til at ligge i rækkefølge fra tidligste start tid til seneste
      setAllClasses((old) => old.sort((a, b) => a.time.start - b.time.start));
      setClassSelection((old) => old.sort((a, b) => a.time.start - b.time.start));

      //Her filtrere vi efter hvilken dag, der er valgt (ved 1st rendering er det dagen i dag)
      setClassSelection((old) => old.filter((item) => item.time.weekday === today));

      //Her filtrere vi en sidste gang, denne gang for det valgte hold. Dette er kun hvis det ikke er alle hold (all-class) der er valgt
      if (chosenClass !== "all-class") {
        setAllClasses((old) => old.filter((item) => item.title === chosenClass));
        setClassSelection((old) => old.filter((item) => item.title === chosenClass));
      }
    }
    showClasses();
  }, [chosenCategory, chosenDayNumber, chosenClass, today]);

  //Hvis den valgte dag ikke indeholder nogle hold, så skal vi have valgt en anden dag. Dette gøres her ved at skifte til den næste dag
  if (allClasses.length !== 0) {
    if (!allClasses.find((item) => item.time.weekday === today)) {
      setChosenDayNumber((old) => (old === 6 ? (old = 0) : old + 1));
    }
  }

  //Function til at style på vores start og slut tider
  function styleTimes(times) {
    let newTime;
    if (times < 999) {
      const addZero = "0" + times;
      const time = addZero.split("");
      newTime = time[0] + time[1] + ":" + time[2] + time[3];
    } else {
      const time = times + "";
      newTime = time[0] + time[1] + ":" + time[2] + time[3];
    }
    return newTime;
  }

  return (
    <Layout current={{ nav: "Fitness", site: "Holdplan" }}>
      <main className={styles.main}>
        <HeaderOne title="Holdplan" color="black" />

        <article className={styles.class_overview}>
          <FilteringSection chosenCategory={chosenCategory} setChosenCategory={setChosenCategory} chosenClass={chosenClass} setChosenClass={setChosenClass} />
          <div className={styles.week_overview}>
            <ArrowBtn
              direction="left"
              onClick={() => {
                setWeekNumber((old) => old - 1);
              }}
            />
            <p>
              Uge <span>{weekNumber}</span>
            </p>
            <ArrowBtn
              direction="right"
              onClick={() => {
                setWeekNumber((old) => old + 1);
              }}
            />
          </div>
          <section className={styles.day_section}>
            <DayBtn day="Mandag" setChosenDayNumber={setChosenDayNumber} allClasses={allClasses} checked={today === "Mandag" && true} />
            <DayBtn day="Tirsdag" setChosenDayNumber={setChosenDayNumber} allClasses={allClasses} checked={today === "Tirsdag" && true} />
            <DayBtn day="Onsdag" setChosenDayNumber={setChosenDayNumber} allClasses={allClasses} checked={today === "Onsdag" && true} />
            <DayBtn day="Torsdag" setChosenDayNumber={setChosenDayNumber} allClasses={allClasses} checked={today === "Torsdag" && true} />
            <DayBtn day="Fredag" setChosenDayNumber={setChosenDayNumber} allClasses={allClasses} checked={today === "Fredag" && true} />
            <DayBtn day="Lørdag" setChosenDayNumber={setChosenDayNumber} allClasses={allClasses} checked={today === "Lørdag" && true} />
            <DayBtn day="Søndag" setChosenDayNumber={setChosenDayNumber} allClasses={allClasses} checked={today === "Søndag" && true} />
          </section>
          <section>
            <section className={styles.classview_example}>
              <p>Tidsrum</p>
              <p>Hold</p>
              <p>Instruktør</p>
              <p>Lokale</p>
            </section>

            {classSelection &&
              classSelection.map((item) => {
                //her map'er vi over classSelection, der indeholder den valgte dags hold udvalg
                //Tiden i vores data er ikke pænt, så den kommer igennem styleTimes funktionen
                const newStart = styleTimes(item.time.start);
                const newEnd = styleTimes(item.time.end);
                return <ClassItem key={item.id} id={item.id} classtitle={item.title} coach={item.trainer} time={newStart + "-" + newEnd} location={item.location} chosenClassItem={chosenClassItem} setChosenClassItem={setChosenClassItem} />;
              })}

            {chosenClassItem !== "" && (
              <section className={styles.mobile_btn_section}>
                <div className={styles.flex}>
                  <LinkBtn href="/holdplan/tilmelding" text="Tilmeld" variant="primary" />
                </div>
              </section>
            )}
          </section>
        </article>
      </main>
    </Layout>
  );
}
