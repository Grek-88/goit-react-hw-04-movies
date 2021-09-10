import { useEffect, useState } from "react";
import s from "../Reviews/Reviews.module.css";
import Spiner from "../Loader/Loader";

export default function Reviews(props) {
  const [review, setReview] = useState(null);
  const [loader, setLoader] = useState(false);
  const reviewsId = props.match.path.split("/")[2];

  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${reviewsId}/reviews?api_key=b935b76f7270f1257638a990b1cb347c&language=en-US&page=1`
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
      .then((review) => {
        setReview(review);
        setLoader(false);
      });
  }, [reviewsId]);

  console.log("review", review);

  return (
    <div>
      <ul>
        {loader && (
          <div style={{ marginLeft: "50%", marginTop: "20px" }}>
            <Spiner />
          </div>
        )}
        {review?.results.length === 0 && (
          <p>We don't have any reviews for this movie</p>
        )}
        {review?.results.map((el) => {
          return (
            <li key={el.id}>
              <b>{el.author}</b>
              <p>{el.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
