import { useEffect, useState } from "react";
import BaseImg from "../../img/baseImg.jpg";
import {
  NavLink,
  Route,
  useHistory,
  useLocation,
  Switch,
} from "react-router-dom";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import s from "../MovieDetailsPage/MovieDetailsPage.module.css";
import Spiner from "../Loader/Loader";
import Button from "../Button/Button";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function MovieDetailsPage(props) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${props.match.params.movieId}?api_key=b935b76f7270f1257638a990b1cb347c&language=en-US`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return history.push({ pathname: "/" });
      })
      .then((movieData) => {
        setMovieDetails(movieData);
        setLoader(false);
      });
    return () => {
      setMovieDetails(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    if (!location.state || location?.state?.from === "/") {
      history.push({ pathname: "/" });
    }

    if (location?.state?.from === "/movies") {
      history.push({
        pathname: "/movies",
        search: `?query=${location.state.search}`,
      });
    }
  };

  return (
    <div>
      {loader && <Spiner />}
      <div className={s.buttonMod}>
        <Button text={"Go back"} onClick={goBack} />
      </div>
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
                to={{
                  pathname: `${props.match.url}/cast`,
                  state: {
                    from: location?.state?.from ? location.state.from : "/",
                    search: location?.state?.search
                      ? `${location.state.search}`
                      : "",
                  },
                }}
                activeClassName={s.active}
              >
                Cast
              </NavLink>
            </li>
            <li className={s.addition_item}>
              <NavLink
                to={{
                  pathname: `${props.match.url}/reviews`,
                  state: {
                    from: location?.state?.from ? location.state.from : "/",
                    search: location?.state?.search
                      ? `${location.state.search}`
                      : "",
                  },
                }}
                activeClassName={s.active}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <Switch>
            <Route path={`${props.match.url}/cast`} exact component={Cast} />
            <Route
              path={`${props.match.url}/reviews`}
              exact
              component={Reviews}
            />
            <Route path={`${props.match.url}/:bad`} component={NotFoundPage} />
          </Switch>
        </>
      )}
    </div>
  );
}
