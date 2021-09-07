export default function ApiFetch(page = 1) {
  const result = fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=b935b76f7270f1257638a990b1cb347c&page=${page}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error("По такому запросу фильмов не найдено. Введите другой запрос.")
    );
  });
  return result;
}
