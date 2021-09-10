import s from "../MoviePageSearch/MoviePageSearch.module.css";
import { Link } from "react-router-dom";
import BaseImg from "../../img/baseImg.jpg";

export default function MoviePageSearch({ dataMovie, query }) {
  return (
    <ul className={s.list}>
      {dataMovie.map((el) => {
        return (
          <li key={el.id} className={s.list_item}>
            <Link
              to={{
                pathname: `/movies/${el.id}`,
                state: {
                  from: "/movies",
                  search: query,
                },
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
  );
}
