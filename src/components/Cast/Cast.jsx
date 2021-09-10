import { useEffect, useState } from "react";
import BaseImg from "../../img/baseImg.jpg";
import s from "../Cast/Cast.module.css";
import Spiner from "../Loader/Loader";

export default function Cast(props) {
  const [cast, setCast] = useState(null);
  const [loader, setLoader] = useState(false);
  console.log("cast", props);
  // console.log(props.match.path.split("/")[2]);
  const movieId = props?.match?.path?.split("/")[2];
  // console.log(Router.Consumer);
  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b935b76f7270f1257638a990b1cb347c&language=en-US`
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
      .then((cast) => {
        setCast(cast);
        setLoader(false);
      });
  }, [movieId]);

  console.log(cast);
  return (
    <div>
      <ul className={s.list}>
        {loader && (
          <div style={{ marginLeft: "50%", marginTop: "20px" }}>
            <Spiner />
          </div>
        )}
        {cast &&
          cast.cast.map((el) => {
            return (
              <li key={el.id} className={s.list_item}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${el.profile_path}`}
                  alt={el.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${BaseImg}`;
                  }}
                />
                <p>{el.name}</p>
                <p>Character: {el.character}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
