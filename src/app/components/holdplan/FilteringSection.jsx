"use client";
import { useEffect, useState } from "react";
import styles from "./FilteringSection.module.scss";
import CategoryFilterRadio from "./CategoryFilterRadio";
import ClassFilterRadio from "./ClassFilterRadio";

export default function FilteringSection({ chosenCategory, setChosenCategory, chosenClass, setChosenClass }) {
  const [selectValues, setSelectValues] = useState(""); //State der indeholder de hold, der vises i hold filtreringen

  //Hver gang chosenCategory bliver ændret, vil der blive fetchet alle de hold, der hører til den valgte kategori
  useEffect(() => {
    async function showCategory() {
      /** Hvis chosenCategory er sat til en kategori, skal der kun fetches hold indenfor kategorien */
      const filteringParamters = chosenCategory !== "all-categories" ? `?category=eq.${chosenCategory}` : "";

      let headersList = {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhvdmx1ZGNwcXVkcXZjcXRlYmxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMzI4MzEsImV4cCI6MjAyOTYwODgzMX0.5K-wz_oerFZ5hmvUq0IOPgJHn0e1sRYh57y_8pFqnKk",
        Prefer: "return=representation",
      };

      let response = await fetch(`https://hovludcpqudqvcqteblj.supabase.co/rest/v1/Hold${filteringParamters}`, {
        method: "GET",
        headers: headersList,
      });

      let data = await response.json();
      setSelectValues(data);
    }
    showCategory();
  }, [chosenCategory]);

  return (
    <section>
      <div className={styles.category_select_wrapper}>
        <select
          onChange={(e) => {
            setChosenCategory(e.target.value);
            setChosenClass("all-class");
          }}
          name="category_filter"
          id="category_filter"
          className={styles.category_select}
          value={chosenCategory}
        >
          <option value="all-categories">Alle kategorier</option>
          <option value="Energy">Welcome Energy</option>
          <option value="Body-mind">Welcome Body Mind</option>
          <option value="Heat">Welcome Heat</option>
          <option value="Reformer">Welcome Reformer</option>
          <option value="Nordic-strong">Welcome Nordic Strong</option>
          <option value="Functional">Welcome Functional</option>
          <option value="Indoor-cycling">Welcome Cycling</option>
          <option value="Pleasure">Welcome Pleasure</option>
        </select>
      </div>
      {chosenCategory !== "all-categories" && (
        <div className={styles.class_select_wrapper}>
          <select onChange={(e) => setChosenClass(e.target.value)} name="class_filter" id="class_filter" className={styles.class_select} value={chosenClass}>
            <option value="all-class">Alle hold</option>
            {selectValues &&
              selectValues.map((item) => {
                return (
                  <option value={item.title} key={item.id}>
                    {item.title}
                  </option>
                );
              })}
          </select>
        </div>
      )}
      <section className={styles.category_radio_wrapper}>
        <CategoryFilterRadio id="all-categories" name="category_filters" label="Alle kategorier" color="white" setChosenCategory={setChosenCategory} setChosenClass={setChosenClass} checked={chosenCategory === "all-categories" && true} />
        <CategoryFilterRadio id="Energy" name="category_filters" label="Wellcome Energy" color="white" setChosenCategory={setChosenCategory} setChosenClass={setChosenClass} checked={chosenCategory === "Energy" && true} />
        <CategoryFilterRadio id="Body-mind" name="category_filters" label="Wellcome Body Mind" color="white" setChosenCategory={setChosenCategory} setChosenClass={setChosenClass} checked={chosenCategory === "Body-mind" && true} />
        <CategoryFilterRadio id="Heat" name="category_filters" label="Wellcome Heat" color="white" setChosenCategory={setChosenCategory} setChosenClass={setChosenClass} checked={chosenCategory === "Heat" && true} />
        <CategoryFilterRadio id="Reformer" name="category_filters" label="Wellcome Reformer" color="white" setChosenCategory={setChosenCategory} setChosenClass={setChosenClass} checked={chosenCategory === "Reformer" && true} />
        <CategoryFilterRadio id="Nordic-strong" name="category_filters" label="Wellcome Nordic Strong" color="white" setChosenCategory={setChosenCategory} setChosenClass={setChosenClass} checked={chosenCategory === "Nordic-strong" && true} />
        <CategoryFilterRadio id="Functional" name="category_filters" label="Wellcome Functional" color="white" setChosenCategory={setChosenCategory} setChosenClass={setChosenClass} checked={chosenCategory === "Functional" && true} />
        <CategoryFilterRadio id="Indoor-cycling" name="category_filters" label="Wellcome Indoor Cycling" color="white" setChosenCategory={setChosenCategory} setChosenClass={setChosenClass} checked={chosenCategory === "Indoor-cycling" && true} />
        <CategoryFilterRadio id="Pleasure" name="category_filters" label="Wellcome Pleasure" color="white" setChosenCategory={setChosenCategory} setChosenClass={setChosenClass} checked={chosenCategory === "Pleasure" && true} />
      </section>
      {chosenCategory !== "all-categories" && (
        <section className={styles.class_radio_wrapper}>
          <ClassFilterRadio id="all-class" name="class_filters" label="Alle hold" color="black" setChosenClass={setChosenClass} checked={chosenClass === "all-class" && true} />

          {selectValues &&
            selectValues.length < 33 &&
            selectValues.map((item) => {
              return <ClassFilterRadio key={item.title} id={item.title} name="class_filters" label={item.title} color="black" setChosenClass={setChosenClass} checked={chosenClass === item.title && true} />;
            })}
        </section>
      )}
    </section>
  );
}
