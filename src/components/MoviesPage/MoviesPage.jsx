import InputSearch from "../InputSearch/InputSearch";
import React, { useState, useEffect } from "react";
import ApiFetch from "../API/ApiFetch";
import Spiner from "../Loader/Loader";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";
import MoviePageSearch from "../MoviePageSearch/MoviePageSearch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryString = require("query-string");

export default function MoviesPage(props) {
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [dataMovie, setDataMovie] = useState([]);
  const [loader, setLoader] = useState(false);
  const location = useLocation();

  let parsed = queryString.parse(location.search);

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoader(true);
    fetch(query, page);
    props.history.push(`/movies/?query=${query}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function fetch(query, page) {
    ApiFetch(query, page).then((movies) => {
      setPage(page + 1);
      setDataMovie((dataMovie) =>
        dataMovie ? [...dataMovie, ...movies.results] : [...movies.results]
      );
      movies.results.length === 0 &&
        toast.error("😲 Enter query...!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      setLoader(false);
    });
  }

  const submitForm = (queryForm) => {
    if (query !== queryForm) {
      setQuery(queryForm);
      setPage(1);
      setDataMovie([]);
    }
    if (query === queryForm) {
      props.history.push(`/movies/?query=${query}`);
    }
  };

  useEffect(() => {
    if (parsed.query && parsed.query !== query) {
      submitForm(parsed.query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed.query]);

  const getNewImg = () => {
    fetch(query, page);
  };

  return (
    <>
      <div>
        <InputSearch onSubmit={submitForm} />
      </div>
      {loader && <Spiner />}

      {props.location?.search === `?query=${query}` && (
        <MoviePageSearch dataMovie={dataMovie} query={query} />
      )}

      {/* {parsed.query && <MoviePageSearch dataMovie={dataMovie} query={query} />} */}

      {props.location.pathname !== "/movies" &&
        page > 1 &&
        dataMovie.length > 0 && (
          <Button onClick={getNewImg} text={"Load more"} />
        )}
    </>
  );
}
