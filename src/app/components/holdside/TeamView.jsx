"use client";
import LinkBtn from "../global/LinkBtn";
import TeamRadioBtn from "./TeamRadioBtn";
import styles from "./TeamView.module.scss";
import { useEffect } from "react";
import { useState } from "react";

export default function TeamView({ searchParams }) {
  const [data, setData] = useState([]); //State der indeholder holdene indenfor den specifikke kategori
  const [chosenTeam, setChosenTeam] = useState(""); //State der indeholder det team, der er klikket på (TeamRadioBtn)

  const [visible, setVisible] = useState(true);

  // FUNKTIONEN BAG KATEGORI-CARD: vi kan se, at der ovenfor bliver sendt et parameter "searchParams" ned til TeamView fra kategorisiden. Hvis man console logger "searchParams.category", vil det være lig med den kategory, der er klikket på. I vores fetch-kald, sørger vi for at benytte url + specifik paramter ("${searchParams.category}"), for at hente al data fra databasen med pågældende category-navn.
  //Her fetches al data som har dén specifikke kategori, som der er klikket på, når siden bliver renderet første gang (=useEffect)
  //Her fetches al data som har dén specifikke kategori, som der er klikket på, når siden bliver renderet første gang.
  useEffect(() => {
    async function fetchFunction({ searchParams }) {
      let headersList = {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhvdmx1ZGNwcXVkcXZjcXRlYmxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMzI4MzEsImV4cCI6MjAyOTYwODgzMX0.5K-wz_oerFZ5hmvUq0IOPgJHn0e1sRYh57y_8pFqnKk",
        Prefer: "return=representation",
      };

      let response = await fetch(`https://hovludcpqudqvcqteblj.supabase.co/rest/v1/Hold?category=eq.${searchParams.category}`, {
        method: "GET",
        headers: headersList,
      });

      let teams = await response.json();
      setData(teams);
    }

    fetchFunction({ searchParams });
  }, [searchParams]);

  //I denne useEffect, sørger vi for at setChosenTeam til at være den første 'title' fra vores fetch, hvis data's længde er større end 0 (altså når der er fetched data). Derefter bliver TeamRadioButton checked, hvis chosenTeam === item.title. Vi har fået hjælp af ChatGPT til nedestående useEffect.
  useEffect(() => {
    if (data.length > 0) {
      setChosenTeam(data[0].title);
    }
  }, [data]);

  //Hér sørger vi for, at filteredItem er lig med den title, der er klikket på - ved at finde det chosenTeam der er lig med item.title
  const filteredItem = data.find((item) => item.title === chosenTeam);

  return (
    <>
      {/* Vi oplever, at renderingen sker så hurtigt (og ikke nødvendigvis oppefra og ned), så data endte med at være undefined, da vi forsøgte at display TeamRadioBtn, før der var fetched data. Derfor skriver vi "data &&" foran "data.map", da vi så sikrer, at data først bruges, når data er true (=har indhold) */}
      <section className={styles.teamview_container}>
        <div className={styles.wrapper}>
          <section className={styles.section_team}>
            <div className={styles.div_blur1}></div>
            {/* Her mapper vi henover den data der er fetched og kreerer en TeamRadioBtn for hvert item/objekt. Og sætter checked til at være chosenTeam === item.title (hvilket er det første item/objekts titel)*/}
            {data && data.map((item) => <TeamRadioBtn key={item.id} title={item.title} setChosenTeam={setChosenTeam} setVisible={setVisible} checked={chosenTeam === item.title}></TeamRadioBtn>)}
            <div className={styles.div_blur2}></div>
          </section>
        </div>
        {/*Hér sørger vi for at vise det indhold, som er filteredItem (chosenTeam === item.title). Altså indhold der matcher det hold, der er klikket på
         */}
        {filteredItem && (
          <div className={`${styles.team_description} ${visible ? styles.visible : ""}`} key={filteredItem.id}>
            <h2 className={styles.team_title}>{filteredItem.title}</h2>
            <p className={styles.team_text}>{filteredItem.text}</p>
            <LinkBtn margin={true} variant="secondary" text="Se holdplan" href={`/holdplan?kategori=${filteredItem.category}&hold=${filteredItem.title.replace("&", "og")}`}></LinkBtn>
            {/* (alle hold der indeholder "&" bliver sendt afsted i href med et "og" i stedet, da den bliver forvirret over & tegnet ellers) */}
          </div>
        )}
      </section>
    </>
  );
}
