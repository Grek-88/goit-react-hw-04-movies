import InputSearch from "../InputSearch/InputSearch";
import React, { useState, useEffect } from "react";
import ApiFetch from "../API/ApiFetch";
import Spiner from "../Loader/Loader";
// import s from "../MoviesPage/MoviesPage.module.css";
import { Route, useLocation } from "react-router-dom";
// import BaseImg from "../../img/baseImg.jpg";
import Button from "../Button/Button";
import MoviePageSearch from "../MoviePageSearch/MoviePageSearch";
import { exact } from "prop-types";
const queryString = require("query-string");

export default function MoviesPage(props) {
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [dataMovie, setDataMovie] = useState([]);
  const [loader, setLoader] = useState(false);
  const [queryNew, setQueryNew] = useState(null);
  const location = useLocation();

  console.log("MoviesPage", props);
  let parsed = queryString.parse(location.search);
  // console.log("parsed.query", parsed.query);
  console.log("parsed", parsed);
  console.log("location", location);

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoader(true);
    fetch(query, page);
    props.history.push(`/movies/?query=${query}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, queryNew]);

  // if (parsed.query && parsed.query === query) {
  //   console.log(999);

  //   setQueryNew(parsed.query);
  // }

  function fetch(query, page) {
    ApiFetch(query, page).then((movies) => {
      setPage(page + 1);
      setDataMovie((dataMovie) =>
        dataMovie ? [...dataMovie, ...movies.results] : [...movies.results]
      );
      setLoader(false);
    });
  }

  const submitForm = (queryForm) => {
    if (query !== queryForm) {
      console.log(111);
      setQuery(queryForm);
      setPage(1);
      setDataMovie([]);
      // parsed = {};
    }
    if (query === queryForm) {
      props.history.push(`/movies/?query=${query}`);
    }
  };

  useEffect(() => {
    if (parsed.query && parsed.query !== query) {
      // fetch(query, page);
      // setQueryNew(parsed.query);
      submitForm(parsed.query);
    }
  }, [parsed.query]);

  const getNewImg = () => {
    fetch(query, page);
  };

  return (
    <>
      <div>
        <InputSearch onSubmit={submitForm} />
      </div>
      {loader && (
        <div style={{ marginTop: "10%", marginLeft: "40%" }}>
          <Spiner />
        </div>
      )}

      {/* <Route path={`/movies/?query=${query}`} exact>
        <MoviePageSearch dataMovie={dataMovie} query={query} />
      </Route> */}

      {props.location?.search === `?query=${query}` && (
        <MoviePageSearch dataMovie={dataMovie} query={query} />
      )}
      {parsed.query && <MoviePageSearch dataMovie={dataMovie} query={query} />}
      {props.location.pathname !== "/movies" && page > 1 && (
        <Button onClick={getNewImg} text={"Load more"} />
      )}
    </>
  );
}
