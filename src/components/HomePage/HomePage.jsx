import ApiFetch from "../API/ApiFetch";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "../HomePage/HomePage.module.css";

export default function HomePage() {
  const [movieStart, setMovieStart] = useState([]);
  // const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  ApiFetch()
    .then((moviesData) => {
      console.log(moviesData.results);
      setMovieStart((movieStart) =>
        movieStart ? [...movieStart, ...moviesData.results] : moviesData.results
      );
    })
    .catch((error) => setError(error));

  console.log(error);

  return (
    <div>
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
                />
                <p>{el.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ((imgDataFetch) => {
//   console.log(imgDataFetch);
//   console.log(page);
//   setPage(page + 1);
//   setImgData((imgData) =>
//     imgData ? [...imgData, ...imgDataFetch.hits] : imgDataFetch.hits
//   );
//   setLoading(false);
// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: "smooth",
// });
// })
//   .catch((error) => setError(error));
