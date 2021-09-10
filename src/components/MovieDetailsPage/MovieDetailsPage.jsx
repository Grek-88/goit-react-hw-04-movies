import { useEffect, useState } from "react";
import BaseImg from "../../img/baseImg.jpg";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import s from "../MovieDetailsPage/MovieDetailsPage.module.css";
import { NavLink, Route } from "react-router-dom";
import Spiner from "../Loader/Loader";
// import Button from "../Button/Button";
// import MoviesPage from "../MoviesPage/MoviesPage";

export default function MovieDetailsPage(props) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${props.match.params.movieId}?api_key=b935b76f7270f1257638a990b1cb347c&language=en-US`
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
      .then((movieData) => {
        setMovieDetails(movieData);
        setLoader(false);
      });
  }, [props.match.params.movieId]);

  // let queryBack = null;

  // const goBack = () => {
  //   console.log(props);
  //   if (!props.location.state || props.location?.state?.from === "/") {
  //     props.history.push({ pathname: "/" });
  //   }

  //   if (props.location?.state?.from === "/movies") {
  //     // queryBack = props.location.state.search;
  //     props.history.push({
  //       pathname: "/movies",
  //       // pathname: `${props.location.state.from}/?query=${props.location.state.search}`,
  //     });
  //   }
  //   // return queryBack;

  //   // props.location?.state?.from
  //   //   ? props.history.push({
  //   //       pathname: `${props.location.state.from}/?query=${props.location.state.search}`,
  //   //     })
  //   //   : props.history.push({ pathname: "/" });

  //   // props.history.push(props?.location?.state?.from ?? "/");
  // };

  // console.log("queryBack", queryBack);
  // if (props.location?.state?.from === "/movies") {
  //   queryBack = props.location.state.search;
  // }

  return (
    <div>
      {loader && (
        <div style={{ marginLeft: "50%", marginTop: "20px" }}>
          <Spiner />
        </div>
      )}
      {/* <Button text={"Go back"} classMode={s.buttonMod} onClick={goBack} /> */}
      {movieDetails && (
        <>
          <article className={s.article}>
            <div className={s.thumb}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.title}
                title={movieDetails.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${BaseImg}`;
                }}
                className={s.poster}
              />
            </div>

            <div>
              {movieDetails.title && (
                <h1 className={s.title}>
                  {movieDetails.title + " "}
                  {movieDetails.release_date ? (
                    <span>({movieDetails.release_date.split("-", 1)})</span>
                  ) : (
                    <span>(N/A)</span>
                  )}
                </h1>
              )}

              <p className={s.score}>
                <b className={s.label}>User score:</b>
                {movieDetails.vote_average ? (
                  <span>{movieDetails.vote_average * 10}%</span>
                ) : (
                  <span>N/A</span>
                )}
                {movieDetails.vote_average ? (
                  <b className={s.vote}>{movieDetails.vote_average}</b>
                ) : null}
              </p>

              <p className={s.overview}>
                <b className={s.label}>Overview:</b>
                <br />
                {movieDetails.overview ? (
                  <span>{movieDetails.overview}</span>
                ) : (
                  <span>N/A</span>
                )}
              </p>

              <b className={s.label}>Genres:</b>

              {movieDetails.genres.length > 0 ? (
                <ul className={s.genresList}>
                  {movieDetails.genres.map(({ id, name }) => (
                    <li key={id} className={s.genresItem}>
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span>N/A</span>
              )}
            </div>
          </article>
          <hr />
          <b className={s.addition}>Additional information:</b>
          <ul>
            <li className={s.addition_item}>
              <NavLink
                to={`${props.match.url}/cast`}
                activeClassName={s.active}
              >
                Cast
              </NavLink>
            </li>
            <li className={s.addition_item}>
              <NavLink
                to={`${props.match.url}/reviews`}
                activeClassName={s.active}
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <Route path={`${props.match.url}/cast`} component={Cast} />
          <Route path={`${props.match.url}/reviews`} component={Reviews} />
          {/* <Route
            path={`/movies/?query=${queryBack}`}
            exact
            component={MoviesPage}
          /> */}
        </>
      )}
    </div>
  );
}
