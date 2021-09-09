import InputSearch from "../InputSearch/InputSearch";
import React, { useState, useEffect } from "react";
import ApiFetch from "../API/ApiFetch";
import Spiner from "../Loader/Loader";
import s from "../MoviesPage/MoviesPage.module.css";
import { Link } from "react-router-dom";
import BaseImg from "../../img/baseImg.jpg";
import Button from "../Button/Button";

export default function MoviesPage() {
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [dataMovie, setDataMovie] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoader(true);
    fetch(query, page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function fetch(query, page) {
    ApiFetch(query, page).then((movies) => {
      // console.log(movies.results);
      // console.log("MoviesPage", page);
      setPage(page + 1);
      setDataMovie((dataMovie) =>
        dataMovie ? [...dataMovie, ...movies.results] : [...movies.results]
      );
      setLoader(false);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  }

  const submitForm = (queryForm) => {
    // console.log(queryForm);
    setQuery(queryForm);
    setPage(1);
    setDataMovie([]);
    // console.log("submitForm", query);
  };

  const getNewImg = () => {
    fetch(query, page);
  };

  return (
    <>
      <div>
        <InputSearch onSubmit={submitForm} />
      </div>
      {loader && (
        <div style={{ margin: "50%" }}>
          <Spiner />
        </div>
      )}
      <ul className={s.list}>
        {dataMovie.map((el) => {
          return (
            <li key={el.id} className={s.list_item}>
              <Link
                to={{
                  pathname: `/movies/${el.id}`,
                  state: { from: "/home" },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                  alt={el.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${BaseImg}`;
                  }}
                />
                <p>{el.title}</p>
                <span className={s.item_rang}>{el.vote_average}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {page > 1 && <Button onClick={getNewImg} />}
    </>
  );
}
