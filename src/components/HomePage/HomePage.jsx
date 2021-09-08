import ApiFetch from "../API/ApiFetch";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import s from "../HomePage/HomePage.module.css";
import BaseImg from "../../img/baseImg.jpg";
import Spiner from "../Loader/Loader";

export default function HomePage() {
  const [movieStart, setMovieStart] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    ApiFetch()
      .then((moviesData) => {
        console.log(moviesData.results);
        setMovieStart(moviesData.results);
        setLoader(false);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <div>
      {loader && (
        <div style={{ margin: "50%" }}>
          <Spiner />
        </div>
      )}
      <ul className={s.list}>
        {movieStart.map((el) => {
          return (
            <li key={el.id} className={s.list_item}>
              <Link
                to={{
                  pathname: `/${el.id}`,
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
    </div>
  );
}
