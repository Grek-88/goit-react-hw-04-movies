import { useEffect, useState } from "react";
import BaseImg from "../../img/baseImg.jpg";

export default function MovieDetailsPage(prop) {
  const [movieDetails, setMovieDetails] = useState(null);
  console.log(prop.match.params.movieId);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${prop.match.params.movieId}?api_key=b935b76f7270f1257638a990b1cb347c&language=en-US`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(
            "По такому запросу фильмов не найдено. Введите другой запрос."
          )
        );
      })
      .then((movieData) => setMovieDetails(movieData));
  }, []);

  console.log(movieDetails);

  return (
    <div>
      {movieDetails && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${BaseImg}`;
            }}
          />
          <p>{movieDetails.title}</p>
        </>
      )}
    </div>
  );
}
