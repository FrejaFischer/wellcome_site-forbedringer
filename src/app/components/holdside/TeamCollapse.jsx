"use client";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./TeamCollapse.module.scss";
import SingleCollapse from "./SingleCollapse";

export default function TeamCollapse({ searchParams }) {
  const [data, setData] = useState([]); //State der indeholder holdene indenfor den specifikke kategori, der er klikket på

  // FUNKTIONEN BAG KATEGORI-CARD: vi kan se, at der ovenfor bliver sendt et parameter "searchParams" ned til TeamCollapse fra kategorisiden. Hvis man console logger "searchParams.category", vil det være lig med den kategory, der er klikket på. I vores fetch-kald, sørger vi for at benytte url + specifik paramter ("${searchParams.category}"), for at hente al data fra databasen med pågældende category-navn.
  //Her fetches al data som har dén specifikke kategori, som der er klikket på, når siden bliver renderet første gang (=useEffect)
  useEffect(() => {
    async function fetchFunction({ searchParams }) {
      let headersList = {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFybHBqYXV2dXN0YWV5bGNldnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNzUwNDMsImV4cCI6MjA1Nzk1MTA0M30.8k3jUmjSi5XZTibwTB1rALWKPRatCv8NFmsHuuPjDHM",
        Prefer: "return=representation",
      };

      let response = await fetch(`https://arlpjauvustaeylcevvi.supabase.co/rest/v1/Hold?category=eq.${searchParams.category}`, {
        method: "GET",
        headers: headersList,
      });

      let teams = await response.json();

      //Hér sætter vi statet data til at være lig med de fetchede teams/hold
      setData(teams);
    }

    fetchFunction({ searchParams });
  }, [searchParams]);

  // Vi sørger for at tjekke, at "data" indeholder noget data, ved at skrive "data &&", da vi ellers får fejl, når vi forsøger at map' henover data, da den ikke når at køre fetchFunction
  //Vi bruger map, og returnerer x-antal SingleCollapse.
  return <div className={styles.team_collapse}>{data && data.map((item) => <SingleCollapse key={item.id} title={item.title} text={item.text} category={item.category}></SingleCollapse>)}</div>;
}
